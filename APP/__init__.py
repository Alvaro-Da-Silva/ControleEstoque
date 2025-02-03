from flask import Flask
from flask_cors import CORS
from APP.config import Config

app = Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False  

from APP import routes 
