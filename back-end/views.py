
from flask import Blueprint, jsonify, request
from models import db, Usuario

# Criando um Blueprint para organizar as rotas
api = Blueprint("api", __name__)

# ----------------------
# Rotas RESTful de Usuário
# ----------------------

# Listar todos os usuários
@api.route("/usuarios", methods=["GET"])
def get_users():
    users = Usuario.query.all()
    return jsonify([user.to_dict() for user in users])

# Obter um usuário por ID
@api.route("/usuarios/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404
    return jsonify(user.to_dict())

# Criar um novo usuário
@api.route("/usuarios", methods=["POST"])
def create_user():
    data = request.json
    if not data or not data.get("name") or not data.get("email"):
        return jsonify({"error": "Dados inválidos"}), 400
    
    new_user = Usuario(name=data["name"], email=data["email"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

# Atualizar um usuário existente
@api.route("/usuarios/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404
    
    data = request.json
    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    db.session.commit()
    return jsonify(user.to_dict())

# Deletar um usuário
@api.route("/usuarios/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "Usuário deletado com sucesso"})

