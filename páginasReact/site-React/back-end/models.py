from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from main import db

# =========================
# Usuário
# =========================
class Usuario(db.Model):
    __tablename__ = "usuarios"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    senha = db.Column(db.String(128), nullable=False)  # maior por segurança
    cep = db.Column(db.String(9), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    rua = db.Column(db.String(150), nullable=False)
    numero = db.Column(db.String(10), nullable=False)

    pedidos = db.relationship("Pedido", back_populates="usuario", cascade="all, delete-orphan")
    carrinhos = db.relationship("Carrinho", back_populates="usuario", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Usuario(nome='{self.nome}', email='{self.email}')>"

# =========================
# Produto
# =========================
class Produto(db.Model):
    __tablename__ = "produtos"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    categoria = db.Column(db.String(50))
    descricao = db.Column(db.Text)
    preco = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    estoque = db.Column(db.Integer, nullable=False, default=0)
    imagem_url = db.Column(db.String(255))

    itens_pedido = db.relationship("PedidoItem", back_populates="produto")
    itens_carrinho = db.relationship("CarrinhoItem", back_populates="produto")

# =========================
# Carrinho
# =========================
class Carrinho(db.Model):
    __tablename__ = "carrinho"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False)
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    usuario = db.relationship("Usuario", back_populates="carrinhos")
    itens = db.relationship("CarrinhoItem", back_populates="carrinho", cascade="all, delete-orphan")

# =========================
# Itens do Carrinho
# =========================
class CarrinhoItem(db.Model):
    __tablename__ = "carrinho_itens"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    carrinho_id = db.Column(db.Integer, db.ForeignKey("carrinho.id", ondelete="CASCADE"), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey("produtos.id", ondelete="RESTRICT"), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False, default=1)

    carrinho = db.relationship("Carrinho", back_populates="itens")
    produto = db.relationship("Produto", back_populates="itens_carrinho")

# =========================
# Pedido
# =========================
class Pedido(db.Model):
    __tablename__ = "pedidos"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False)
    data = db.Column(db.DateTime, default=datetime.utcnow)
    total = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    status = db.Column(db.String(20), nullable=False, default="pendente")

    usuario = db.relationship("Usuario", back_populates="pedidos")
    itens = db.relationship("PedidoItem", back_populates="pedido", cascade="all, delete-orphan")

# =========================
# Itens do Pedido
# =========================
class PedidoItem(db.Model):
    __tablename__ = "pedido_itens"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey("pedidos.id", ondelete="CASCADE"), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey("produtos.id", ondelete="RESTRICT"), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    preco_unit = db.Column(db.Numeric(10, 2), nullable=False)

    pedido = db.relationship("Pedido", back_populates="itens")
    produto = db.relationship("Produto", back_populates="itens_pedido")
