from flask import Blueprint, jsonify, request
from models import db, Usuario

api = Blueprint("api", __name__)

def usuario_to_dict(u):
    return {
        "id": u.id,
        "nome": u.nome,
        "email": u.email,
        "senha": u.senha,
        "cep": u.cep,
        "cidade": u.cidade,
        "rua": u.rua,
        "numero": u.numero
    }

# Listar todos os usuários
@api.route("/usuarios", methods=["GET"])
def listar_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([usuario_to_dict(u) for u in usuarios])

# Obter usuário por ID
@api.route("/usuarios/<int:user_id>", methods=["GET"])
def obter_usuario(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404
    return jsonify(usuario_to_dict(user))

# Criar usuário
@api.route("/usuarios", methods=["POST"])
def criar_usuario():
    data = request.get_json() or {}
    # mínimos
    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")
    if not (nome and email and senha):
        return jsonify({"error": "nome, email e senha são obrigatórios"}), 400

    # evita duplicidade de email simples
    if Usuario.query.filter_by(email=email).first():
        return jsonify({"error": "Email já cadastrado"}), 400

    usuario = Usuario(
        nome=nome,
        email=email,
        senha=senha,
        cep=data.get("cep", ""),
        cidade=data.get("cidade", ""),
        rua=data.get("rua", ""),
        numero=data.get("numero", "")
    )
    try:
        db.session.add(usuario)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erro ao salvar no banco", "details": str(e)}), 500

    return jsonify({"message": "Usuário criado com sucesso", "id": usuario.id}), 201

# Atualizar usuário
@api.route("/usuarios/<int:user_id>", methods=["PUT"])
def atualizar_usuario(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404

    data = request.get_json() or {}
    user.nome = data.get("nome", user.nome)
    user.email = data.get("email", user.email)
    user.senha = data.get("senha", user.senha)
    user.cep = data.get("cep", user.cep)
    user.cidade = data.get("cidade", user.cidade)
    user.rua = data.get("rua", user.rua)
    user.numero = data.get("numero", user.numero)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erro ao atualizar", "details": str(e)}), 500

    return jsonify({"message": "Usuário atualizado com sucesso"})

# Deletar usuário
@api.route("/usuarios/<int:user_id>", methods=["DELETE"])
def deletar_usuario(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404

    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erro ao deletar", "details": str(e)}), 500

    return jsonify({"message": "Usuário deletado com sucesso"})

# Login simples (sem token) — só pra protótipo
@api.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    senha = data.get("senha")

    if not (email and senha):
        return jsonify({"error": "Email e senha obrigatórios"}), 400

    user = Usuario.query.filter_by(email=email).first()
    if not user or user.senha != senha:
        return jsonify({"error": "Credenciais inválidas"}), 401

    return jsonify(usuario_to_dict(user))


@api.route("/usuarios/update", methods=["PUT"])
def update_usuario():
    data = request.json
    usuario = Usuario.query.filter_by(email=data["email"]).first()
    if not usuario:
        return jsonify({"error": "Usuário não encontrado"}), 404

    usuario.nome = data["nome"]
    usuario.cep = data["cep"]
    usuario.bairro = data["bairro"]
    usuario.rua = data["rua"]
    usuario.numero = data["numero"]
    usuario.complemento = data["complemento"]

    db.session.commit()
    return jsonify({"message": "Usuário atualizado com sucesso!"})
