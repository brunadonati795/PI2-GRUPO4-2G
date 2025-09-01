from main import app
import os
from decimal import Decimal
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Produto, Usuario, Carrinho, CarrinhoItem, Pedido, PedidoItem


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
@app.route("/usuarios", methods=["GET"])
def listar_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([usuario_to_dict(u) for u in usuarios])


# Obter usuário por ID
@app.route("/usuarios/<int:user_id>", methods=["GET"])
def obter_usuario(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404
    return jsonify(usuario_to_dict(user))


# Criar usuário
@app.route("/usuarios", methods=["POST"])
def criar_usuario():
    data = request.get_json() or {}

    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")
    if not (nome and email and senha):
        return jsonify({"error": "nome, email e senha são obrigatórios"}), 400

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
@app.route("/usuarios/<int:user_id>", methods=["PUT"])
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
@app.route("/usuarios/<int:user_id>", methods=["DELETE"])
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




@app.route("/usuarios/update", methods=["PUT"])
def update_usuario():
    data = request.json
    usuario = Usuario.query.filter_by(email=data["email"]).first()
    if not usuario:
        return jsonify({"error": "Usuário não encontrado"}), 404

    usuario.cep = data["cep"]
    usuario.cidade = data["cidade"]
    usuario.email = data["email"]
    usuario.nome = data["nome"]
    usuario.numero = data["numero"]
    usuario.rua = data["rua"]
    usuario.senha = data["senha"]


    db.session.commit()
    return jsonify({"message": "Usuário atualizado com sucesso!"})

# -------------------------------
# PRODUTOS
# -------------------------------

@app.route("/produtos", methods=["GET"])
def listar_produtos():
    produtos = Produto.query.all()
    return jsonify([{
        "id": p.id,
        "nome": p.nome,
        "categoria": p.categoria,
        "preco": float(p.preco),
        "descricao": p.descricao,
        "imagem_url": p.imagem_url,
        "estoque": p.estoque
    } for p in produtos])


@app.route("/produtos/<int:pid>", methods=["GET"])
def obter_produto(pid):
    p = Produto.query.get(pid)
    if not p:
        return jsonify({"erro": "Produto não encontrado"}), 404
    return jsonify({
        "id": p.id,
        "nome": p.nome,
        "categoria": p.categoria,
        "preco": float(p.preco),
        "descricao": p.descricao,
        "imagem_url": p.imagem_url,
        "estoque": p.estoque
    })


@app.route("/produtos", methods=["POST"])
def criar_produto():
    data = request.get_json(force=True)
    p = Produto(
        nome=data.get("nome"),
        categoria=data.get("categoria"),
        preco=Decimal(str(data.get("preco", 0))),
        descricao=data.get("descricao"),
        imagem_url=data.get("imagem_url"),
        estoque=int(data.get("estoque", 0)),
    )
    db.session.add(p)
    db.session.commit()
    return jsonify({"id": p.id}), 201


@app.route("/produtos/<int:pid>", methods=["PUT"])
def atualizar_produto(pid):
    data = request.get_json(force=True)
    p = Produto.query.get(pid)
    if not p:
        return jsonify({"erro": "Produto não encontrado"}), 404

    for k in ["nome", "categoria", "descricao", "imagem_url"]:
        if k in data:
            setattr(p, k, data[k])
    if "preco" in data:
        p.preco = Decimal(str(data["preco"]))
    if "estoque" in data:
        p.estoque = int(data["estoque"])

    db.session.commit()
    return jsonify({"ok": True})


@app.route("/produtos/<int:pid>", methods=["DELETE"])
def remover_produto(pid):
    p = Produto.query.get(pid)
    if not p:
        return jsonify({"erro": "Produto não encontrado"}), 404
    db.session.delete(p)
    db.session.commit()
    return jsonify({"ok": True})


# -------------------------------
# HELPERS DE CARRINHO
# -------------------------------

def get_or_create_carrinho(usuario_id: int):
    carrinho = Carrinho.query.filter_by(usuario_id=usuario_id).first()
    if not carrinho:
        carrinho = Carrinho(usuario_id=usuario_id)
        db.session.add(carrinho)
        db.session.commit()
    return carrinho


def serialize_carrinho(carrinho: Carrinho):
    itens = []
    total = Decimal("0")
    for item in carrinho.itens:
        preco = item.produto.preco
        subtotal = preco * item.quantidade
        itens.append({
            "id": item.id,
            "produto_id": item.produto_id,
            "nome": item.produto.nome,
            "imagem_url": item.produto.imagem_url,
            "preco": float(preco),
            "quantidade": item.quantidade,
            "subtotal": float(subtotal),
        })
        total += subtotal
    return {"id": carrinho.id, "usuario_id": carrinho.usuario_id, "itens": itens, "total": float(total)}


# -------------------------------
# CARRINHO
# -------------------------------

@app.route("/carrinho/<int:usuario_id>", methods=["GET"])
def obter_carrinho(usuario_id):
    carrinho = get_or_create_carrinho(usuario_id)
    return jsonify(serialize_carrinho(carrinho))


@app.route("/carrinho/<int:usuario_id>/adicionar", methods=["POST"])
def adicionar_item(usuario_id):
    data = request.get_json(force=True)
    produto_id = int(data["produto_id"])
    quantidade = int(data.get("quantidade", 1))

    carrinho = get_or_create_carrinho(usuario_id)
    item = next((i for i in carrinho.itens if i.produto_id == produto_id), None)
    if item:
        item.quantidade += quantidade
    else:
        item = CarrinhoItem(carrinho_id=carrinho.id, produto_id=produto_id, quantidade=quantidade)
        db.session.add(item)

    db.session.commit()
    return jsonify(serialize_carrinho(carrinho)), 201


@app.route("/carrinho/<int:usuario_id>/remover", methods=["POST"])
def remover_item(usuario_id):
    data = request.get_json(force=True)
    produto_id = int(data["produto_id"])
    quantidade = int(data.get("quantidade", 1))

    carrinho = get_or_create_carrinho(usuario_id)
    item = next((i for i in carrinho.itens if i.produto_id == produto_id), None)
    if not item:
        return jsonify({"erro": "Item não encontrado no carrinho"}), 404

    item.quantidade -= quantidade
    if item.quantidade <= 0:
        db.session.delete(item)

    db.session.commit()
    return jsonify(serialize_carrinho(carrinho))


@app.route("/carrinho/<int:usuario_id>", methods=["DELETE"])
def limpar_carrinho(usuario_id):
    carrinho = get_or_create_carrinho(usuario_id)
    for item in list(carrinho.itens):
        db.session.delete(item)
    db.session.commit()
    return jsonify(serialize_carrinho(carrinho))


# -------------------------------
# PEDIDOS
# -------------------------------

@app.route("/pedidos/<int:usuario_id>", methods=["POST"])
def criar_pedido(usuario_id):
    carrinho = get_or_create_carrinho(usuario_id)
    if not carrinho.itens:
        return jsonify({"erro": "Carrinho vazio"}), 400

    total = sum(i.produto.preco * i.quantidade for i in carrinho.itens)
    pedido = Pedido(usuario_id=usuario_id, total=total, status="pendente")
    db.session.add(pedido)
    db.session.commit()

    # adicionar itens
    for i in carrinho.itens:
        pi = PedidoItem(
            pedido_id=pedido.id,
            produto_id=i.produto_id,
            quantidade=i.quantidade,
            preco_unit=i.produto.preco
        )
        db.session.add(pi)

    # limpar carrinho
    for i in list(carrinho.itens):
        db.session.delete(i)

    db.session.commit()
    return jsonify({"id": pedido.id, "total": float(pedido.total), "status": pedido.status}), 201


@app.route("/pedidos/<int:usuario_id>", methods=["GET"])
def historico_pedidos(usuario_id):
    pedidos = Pedido.query.filter_by(usuario_id=usuario_id).order_by(Pedido.id.desc()).all()
    out = []
    for p in pedidos:
        out.append({
            "id": p.id,
            "usuario_id": p.usuario_id,
            "total": float(p.total),
            "status": p.status,
            "criado_em": str(p.criado_em),
            "itens": [{
                "produto_id": it.produto_id,
                "nome": it.produto.nome,
                "quantidade": it.quantidade,
                "preco_unit": float(it.preco_unit)
            } for it in p.itens]
        })
    return jsonify(out)
