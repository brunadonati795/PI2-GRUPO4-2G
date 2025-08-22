from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Usuario, Cliente, Produto, Carrinho, CarrinhoItem

api = Blueprint("api", __name__)

# USUÁRIOS

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

