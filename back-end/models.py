from main import db
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Categoria(db.Model):
    __tablename__ = 'categorias'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(60), nullable=False)
    descricao = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def __repr__(self):
        return f'<Categoria {self.nome}>'

class Fornecedor(db.Model):
    __tablename__ = 'fornecedores'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(60), nullable=False)
    contato = db.Column(db.String(120))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def __repr__(self):
        return f'<Fornecedor {self.nome}>'

class Produto(db.Model):
    __tablename__ = 'produtos'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(60), nullable=False)
    descricao = db.Column(db.Text)
    preco = db.Column(db.Numeric(10, 2), nullable=False)
    quantidade_estoque = db.Column(db.Integer, nullable=False, default=0)
    imagem_url = db.Column(db.Text)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=False)
    fornecedor_id = db.Column(db.Integer, db.ForeignKey('fornecedores.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    categoria = db.relationship('Categoria', backref='produtos')
    fornecedor = db.relationship('Fornecedor', backref='produtos')

    def __repr__(self):
        return f'<Produto {self.nome}>'

class VariacaoProduto(db.Model):
    __tablename__ = 'variacoes_produto'
    id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    nome_variacao = db.Column(db.String(60), nullable=False)
    preco = db.Column(db.Numeric(10, 2), nullable=False)
    quantidade_estoque = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    produto = db.relationship('Produto', backref='variacoes')

    def __repr__(self):
        return f'<Variacao {self.nome_variacao}>'

class Cliente(db.Model):
    __tablename__ = 'clientes'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    senha_hash = db.Column(db.String(255), nullable=False)
    telefone = db.Column(db.String(20))
    cidade = db.Column(db.String(60))
    endereco_completo = db.Column(db.String(260))
    data_cadastro = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def __repr__(self):
        return f'<Cliente {self.nome}>'

class EnderecoEntrega(db.Model):
    __tablename__ = 'enderecos_entrega'
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'), nullable=False)
    descricao = db.Column(db.String(60))
    endereco_completo = db.Column(db.String(260), nullable=False)
    cidade = db.Column(db.String(60))
    estado = db.Column(db.String(60))
    cep = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    cliente = db.relationship('Cliente', backref='enderecos')

    def __repr__(self):
        return f'<EnderecoEntrega {self.descricao}>'

class Pedido(db.Model):
    __tablename__ = 'pedidos'
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'), nullable=False)
    endereco_entrega_id = db.Column(db.Integer, db.ForeignKey('enderecos_entrega.id'))
    data_pedido = db.Column(db.DateTime, server_default=db.func.now())
    status = db.Column(db.String(20), default='Pendente')
    valor_total = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    cliente = db.relationship('Cliente', backref='pedidos')
    endereco_entrega = db.relationship('EnderecoEntrega', backref='pedidos')

    def __repr__(self):
        return f'<Pedido {self.id}>'

class ItemPedido(db.Model):
    __tablename__ = 'itens_pedido'
    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedidos.id'), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    preco_unitario = db.Column(db.Numeric(10, 2), nullable=False)

    pedido = db.relationship('Pedido', backref='itens')
    produto = db.relationship('Produto', backref='itens_pedido')

    def __repr__(self):
        return f'<ItemPedido {self.id}>'

class Pagamento(db.Model):
    __tablename__ = 'pagamentos'
    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedidos.id'), nullable=False)
    data_pagamento = db.Column(db.DateTime, server_default=db.func.now())
    metodo = db.Column(db.String(20))
    status = db.Column(db.String(20))
    valor_pago = db.Column(db.Numeric(10, 2), nullable=False)

    pedido = db.relationship('Pedido', backref='pagamentos')

    def __repr__(self):
        return f'<Pagamento {self.id}>'

class EstoqueHistorico(db.Model):
    __tablename__ = 'estoque_historico'
    id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    data_movimentacao = db.Column(db.DateTime, server_default=db.func.now())
    tipo = db.Column(db.String(10), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    motivo = db.Column(db.String(60))

    produto = db.relationship('Produto', backref='historico_estoque')

    def __repr__(self):
        return f'<EstoqueHistorico {self.id}>'

class Carrinho(db.Model):
    __tablename__ = 'carrinhos'
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'), nullable=False)
    data_criacao = db.Column(db.DateTime, server_default=db.func.now())

    cliente = db.relationship('Cliente', backref='carrinhos')

    def __repr__(self):
        return f'<Carrinho {self.id}>'

class CarrinhoItem(db.Model):
    __tablename__ = 'carrinho_itens'
    id = db.Column(db.Integer, primary_key=True)
    carrinho_id = db.Column(db.Integer, db.ForeignKey('carrinhos.id'), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)

    carrinho = db.relationship('Carrinho', backref='itens')
    produto = db.relationship('Produto', backref='itens_carrinho')

    def __repr__(self):
        return f'<CarrinhoItem {self.id}>'

class Avaliacao(db.Model):
    __tablename__ = 'avaliacoes'
    id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'), nullable=False)
    nota = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.Text)
    data = db.Column(db.DateTime, server_default=db.func.now())

    produto = db.relationship('Produto', backref='avaliacoes')
    cliente = db.relationship('Cliente', backref='avaliacoes')

    def __repr__(self):
        return f'<Avaliacao {self.id}>'

class Cupom(db.Model):
    __tablename__ = 'cupons'
    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(60), unique=True, nullable=False)
    desconto_percentual = db.Column(db.Numeric(5, 2))
    valor_fixo = db.Column(db.Numeric(10, 2))
    data_validade = db.Column(db.Date)
    uso_maximo = db.Column(db.Integer)
    usado = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<Cupom {self.codigo}>'

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    senha_hash = db.Column(db.String(255), nullable=False)
    tipo = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def __repr__(self):
        return f'<Usuario {self.nome}>'

class Log(db.Model):
    __tablename__ = 'logs'
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'))
    acao = db.Column(db.String(60), nullable=False)
    data = db.Column(db.DateTime, server_default=db.func.now())
    ip = db.Column(db.String(60))

    cliente = db.relationship('Cliente', backref='logs')

    def __repr__(self):
        return f'<Log {self.id}>'
