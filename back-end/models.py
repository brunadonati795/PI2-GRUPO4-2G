from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = "usuarios"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    senha = db.Column(db.String(16), nullable=False)
    cep = db.Column(db.String(9), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    rua = db.Column(db.String(150), nullable=False)
    numero = db.Column(db.String(10), nullable=False)

    def __repr__(self):
        return f"<Usuario(nome='{self.nome}', email='{self.email}')>"