from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS   # <--- IMPORTANTE

app = Flask(__name__)
app.config.from_pyfile('config.py')

db = SQLAlchemy(app)

# Libera o CORS para o front (React, etc.)
CORS(app)

from views import *

if __name__ == '__main__':
    app.run(debug=True)
