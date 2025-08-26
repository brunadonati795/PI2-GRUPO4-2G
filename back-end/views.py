from flask import Blueprint, jsonify, request
from models import db, Usuario

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
            "senha": u.senha,
            "cep": u.cep,
            "cidade": u.cidade,
            "rua": u.rua,
            "numero": u.numero
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
        "senha": user.senha,
        "cep": user.cep,
        "cidade": user.cidade,
        "rua": user.rua,
        "numero": user.numero
    })

# Criar usuário
@api.route("/usuarios", methods=["POST"])
def criar_usuario():
    data = request.json
    if not data.get("nome") or not data.get("email") or not data.get("senha"):
        return jsonify({"error": "Nome, email e senha são obrigatórios"}), 400
    
    novo_usuario = Usuario(
        nome=data["nome"],
        email=data["email"],
        senha=data["senha"],  # sem hash
        cep=data.get("cep", ""),
        cidade=data.get("cidade", ""),
        rua=data.get("rua", ""),
        numero=data.get("numero", "")
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
    user.senha = data.get("senha", user.senha)
    user.cep = data.get("cep", user.cep)
    user.cidade = data.get("cidade", user.cidade)
    user.rua = data.get("rua", user.rua)
    user.numero = data.get("numero", user.numero)

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
