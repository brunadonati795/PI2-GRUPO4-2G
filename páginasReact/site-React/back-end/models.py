from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from main import db


class Usuario(db.Model):
    __tablename__ = "usuarios"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    senha = db.Column(db.String(128), nullable=False)  # deixei maior por segurança
    cep = db.Column(db.String(9), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    rua = db.Column(db.String(150), nullable=False)
    numero = db.Column(db.String(10), nullable=False)

    pedidos = db.relationship("Pedido", back_populates="usuario")

    def __repr__(self):
        return f"<Usuario(nome='{self.nome}', email='{self.email}')>"

class Produto(db.Model):
    __tablename__ = "produtos"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)
    preco = db.Column(db.Numeric(10, 2), nullable=False)
    estoque = db.Column(db.Integer, default=0)
    imagem_url = db.Column(db.String(255))

    itens = db.relationship("PedidoItem", back_populates="produto")

class Pedido(db.Model):
    __tablename__ = "pedidos"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuarios.id"))
    data = db.Column(db.DateTime, default=datetime.utcnow)
    total = db.Column(db.Numeric(10, 2), nullable=False)

    usuario = db.relationship("Usuario", back_populates="pedidos")
    itens = db.relationship("PedidoItem", back_populates="pedido")

class PedidoItem(db.Model):
    __tablename__ = "pedido_itens"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey("pedidos.id"))
    produto_id = db.Column(db.Integer, db.ForeignKey("produtos.id"))
    quantidade = db.Column(db.Integer, nullable=False)
    preco = db.Column(db.Numeric(10, 2), nullable=False)

    pedido = db.relationship("Pedido", back_populates="itens")
    produto = db.relationship("Produto", back_populates="itens")
