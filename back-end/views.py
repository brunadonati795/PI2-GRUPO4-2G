from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Usuario, Cliente, Produto, Carrinho, CarrinhoItem

api = Blueprint("api", __name__)

# USUÁRIOS


from models import db, Usuario
import re
import datetime
from flask import current_app
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

api = Blueprint("api", __name__)

# Listar todos os usuários
@api.route("/usuarios", methods=["GET"])
def listar_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([
        {
            "id": u.id,
            "nome": u.nome,
            "email": u.email,
            "tipo": u.tipo
        }
        for u in usuarios
    ])


# Obter usuário por ID
@api.route("/usuarios/<int:user_id>", methods=["GET"])
def obter_usuario(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404
    return jsonify({
        "id": user.id,
        "nome": user.nome,
        "email": user.email,
        "tipo": user.tipo
    })


# Criar usuário
@api.route("/usuarios", methods=["POST"])
def criar_usuario():
    data = request.json
    if not data.get("nome") or not data.get("email") or not data.get("senha"):
        return jsonify({"error": "Nome, email e senha são obrigatórios"}), 400
    
    hashed_pw = generate_password_hash(data["senha"])
    novo_usuario = Usuario(
        nome=data["nome"],
        email=data["email"],
        senha_hash=hashed_pw,
        tipo=data.get("tipo", "cliente")
    )
    db.session.add(novo_usuario)
    db.session.commit()
    return jsonify({"message": "Usuário criado com sucesso", "id": novo_usuario.id}), 201



# Atualizar usuário

@api.route("/usuarios/<int:user_id>", methods=["PUT"])
def atualizar_usuario(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404


    data = request.json
    user.nome = data.get("nome", user.nome)
    user.email = data.get("email", user.email)
    if data.get("senha"):
        user.senha_hash = generate_password_hash(data["senha"])
    user.tipo = data.get("tipo", user.tipo)

    db.session.commit()
    return jsonify({"message": "Usuário atualizado com sucesso"})


# Deletar usuário
@api.route("/usuarios/<int:user_id>", methods=["DELETE"])
def deletar_usuario(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "Usuário deletado com sucesso"})


# CARRINHO


@api.route("/carrinho/<int:cliente_id>", methods=["GET"])
def ver_carrinho(cliente_id):
    carrinho = Carrinho.query.filter_by(cliente_id=cliente_id).first()
    if not carrinho:
        return jsonify({"itens": [], "total": 0})

    itens = []
    total = 0
    for item in carrinho.itens:
        subtotal = float(item.produto.preco) * item.quantidade
        itens.append({
            "produto_id": item.produto.id,
            "nome": item.produto.nome,
            "quantidade": item.quantidade,
            "preco_unitario": float(item.produto.preco),
            "subtotal": subtotal
        })
        total += subtotal

    return jsonify({"carrinho_id": carrinho.id, "itens": itens, "total": total})

@api.route("/carrinho/<int:cliente_id>/add", methods=["POST"])
def adicionar_item_carrinho(cliente_id):
    data = request.json
    produto = Produto.query.get(data.get("produto_id"))
    if not produto:
        return jsonify({"error": "Produto não encontrado"}), 404

    carrinho = Carrinho.query.filter_by(cliente_id=cliente_id).first()
    if not carrinho:
        carrinho = Carrinho(cliente_id=cliente_id)
        db.session.add(carrinho)
        db.session.commit()

    item = CarrinhoItem.query.filter_by(carrinho_id=carrinho.id, produto_id=produto.id).first()
    if item:
        item.quantidade += data.get("quantidade", 1)
    else:
        item = CarrinhoItem(carrinho_id=carrinho.id, produto_id=produto.id, quantidade=data.get("quantidade", 1))
        db.session.add(item)

    db.session.commit()
    return jsonify({"message": "Produto adicionado ao carrinho"})

@api.route("/carrinho/<int:cliente_id>/remove", methods=["POST"])
def remover_item_carrinho(cliente_id):
    data = request.json
    carrinho = Carrinho.query.filter_by(cliente_id=cliente_id).first()
    if not carrinho:
        return jsonify({"error": "Carrinho não encontrado"}), 404

    item = CarrinhoItem.query.filter_by(carrinho_id=carrinho.id, produto_id=data.get("produto_id")).first()
    if not item:
        return jsonify({"error": "Item não encontrado no carrinho"}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Produto removido do carrinho"})

@api.route("/carrinho/<int:cliente_id>/frete", methods=["GET"])
def calcular_frete(cliente_id):
    # Frete (o suficiente para ninguem reclamar)
    carrinho = Carrinho.query.filter_by(cliente_id=cliente_id).first()
    if not carrinho:
        return jsonify({"error": "Carrinho não encontrado"}), 404

    total_itens = sum(item.quantidade for item in carrinho.itens)
    frete = 10 + (2 * total_itens)  # fixo + variável
    return jsonify({"frete": frete})

# Verificar se email já existe
@api.route("/check-email", methods=["POST"])
def check_email():
    email = request.json.get("email")
    if not email:
        return jsonify({"error": "Email não informado"}), 400

    exists = Usuario.query.filter_by(email=email).first() is not None
    return jsonify({"available": not exists})

# Verificar senha
@api.route("/check-password", methods=["POST"])
def check_password():
    password = request.json.get("password")

    if not password:
        return jsonify({"error": "Senha não informada"}), 400

    if len(password) < 8 or len(password) > 16:
        return jsonify({"valid": False, "message": "A senha deve ter entre 8 e 16 caracteres"})
    
    if not re.search(r"[^A-Za-z0-9]", password):
        return jsonify({"valid": False, "message": "A senha deve conter pelo menos um caractere especial"})

    return jsonify({"valid": True, "message": "Senha válida ✅"})

# Autentica um usuário verificando email + senha.
@api.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email e senha obrigatórios"}), 400

    user = Usuario.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Credenciais inválidas"}), 401

    token = jwt.encode(
        {
            "user_id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # expira em 1h
        },
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({"token": token})

# Logout
@api.route("/logout", methods=["POST"])
def logout():
    return jsonify({"message": "Logout realizado com sucesso"})

# Registro com verificação automática
@api.route("/usuarios", methods=["POST"])
def create_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "Nome, email e senha obrigatórios"}), 400

    if Usuario.query.filter_by(email=email).first():
        return jsonify({"error": "Email já cadastrado"}), 400

    if len(password) < 8 or len(password) > 16 or not re.search(r"[^A-Za-z0-9]", password):
        return jsonify({"error": "Senha inválida. Deve ter 8-16 caracteres e pelo menos 1 especial"}), 400

    hashed_password = generate_password_hash(password)

    new_user = Usuario(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 201


