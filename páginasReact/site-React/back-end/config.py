from sqlalchemy import create_engine
from urllib.parse import quote_plus
import os

SECRET_KEY = 'AAAbbb123!@#'  # pode modificar, mas não retirar, senão da um erro chato pra p0**@

senha = quote_plus('b4t3r14PEARL!@') #LEMBRAR DE COLOCAR ISSO COM A SENHA DO BANCOO DE DADOS ANTES DE FAZER TODAS AS LIGAÇÕES

SQLALCHEMY_DATABASE_URI = \
    f"mysql+mysqlconnector://root:{senha}@127.0.0.1:3306/pi2" # faz a conexão com o banco de dados localmente, se quiser usar outra maquina mudar o endereço IP
#   f"mysql+mysqlconnector://root:{senha}@127.0.0.1:3306/pi2" <- Usar essse quando tiver senha, senão não roda


engine = create_engine(SQLALCHEMY_DATABASE_URI)

try:
    with engine.connect() as conn:
        print("Conexão estabelecida com sucesso!")
except Exception as e:
    print("Erro ao conectar:", e)
