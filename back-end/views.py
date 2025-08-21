from flask import Blueprint, jsonify, request
from models import db, Usuario
import re
import jwt
import datetime
from flask import current_app
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

api = Blueprint("api", __name__)

# Listar todos os usuários
@api.route("/usuarios", methods=["GET"])
def get_users():
    users = Usuario.query.all()
    return jsonify([user.to_dict() for user in users])

# Obter usuário por ID
@api.route("/usuarios/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404
    return jsonify(user.to_dict())

# Criar usuário
@api.route("/usuarios", methods=["POST"])
def create_user():
    data = request.json
    if not data or not data.get("name") or not data.get("email"):
        return jsonify({"error": "Dados inválidos"}), 400
    
    new_user = Usuario(name=data["name"], email=data["email"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

# Atualizar usuário
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

# Deletar usuário
@api.route("/usuarios/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "Usuário deletado com sucesso"})

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


