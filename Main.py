from flask import Flask,make_response,jsonify,request
import mysql.connector

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False  

DB = mysql.connector.connect(
    host='localhost',
    user='root',
    password='12345',
    database='estoque',
)

@app.route('/users', methods=['GET'])
def BuscarUsers():

    CRS = DB.cursor()
    CRS.execute('SELECT * FROM usuarios')
    data = CRS.fetchall()

    users = list()
    for US in data:
        users.append({

            'id':    US[0],
            'nome':  US[1],
            'login': US[2],
            'senha': US[3],
        })

    return make_response(
        jsonify(
            users = users
        )
    )

@app.route('/produtos', methods=['GET'])
def BuscaProdutos():
    CRS = DB.cursor()
    CRS.execute('SELECT * FROM produtos')
    data = CRS.fetchall()

    prod =list()
    for P in data:
        prod.append({
            'id':         P[0],
            'nome':       P[1],
            'descrição':  P[2],
            'Preço':      P[3],
            'Quantidade': P[4]
        })

    return make_response(
        jsonify(
            Produtos = prod
        )
    )


@app.route('/users', methods=['POST'])
def CadastroUsers():
    data = request.json

    CRS = DB.cursor()
    cmd = 'INSERT INTO usuarios (nome, login, senha) VALUES (%s, %s, %s)'
    values = (data['nome'],data['login'],data['senha'])
    CRS.execute(cmd,values)
    DB.commit()

    return make_response(
        jsonify(
            mensagem = 'Usuário cadastrado',
            cadastro = data
        )
    )

@app.route('/produtos',methods=['POST'])
def cadastroProduto():
    data = request.json

    CRS = DB.cursor()
    cmd = 'INSERT INTO produtos (nome,descricao,preco,quantidade) VALUES (%s,%s,%s,%s)'
    values = (data['nome'],data['descricao'],data['preco'],data['quantidade'],)
    CRS.execute(cmd,values)
    DB.commit()

    return make_response(
        jsonify(
            mensagem = 'Produto cadastrado',
            cadastro = data
        )
    )

@app.route('/users/<int:id>', methods=['PUT'])
def AlterarUsers(id):
    data = request.json

    CRS = DB.cursor()
    cmd = 'UPDATE usuarios SET nome = %s, login = %s, senha = %s WHERE id = %s'
    values = (data['nome'],data['login'],data['senha'], id)
    CRS.execute(cmd,values)
    DB.commit()

    return make_response(
        jsonify(
            mensagem = 'Usuário alterado'
        )
    )

@app.route('/produtos/<int:id>', methods=['PUT'])
def AlterarProdutos(id):
    data = request.json

    CRS = DB.cursor()
    cmd = 'UPDATE produtos SET nome = %s, descricao = %s, preco = %s, quantidade = %s WHERE id = %s'
    values = (data['nome'], data['descricao'], data['preco'], data['quantidade'], id )
    CRS.execute(cmd,values)
    DB.commit()

    return make_response(
        jsonify(
            mensagem = 'Produto alterado com sucesso'
        )
    )

@app.route('/users/<int:id>', methods=['DELETE'])
def DeletarUsers(id):
    CRS = DB.cursor()
    cmd = 'DELETE FROM usuarios WHERE id = %s'
    values = [id]
    CRS.execute(cmd,values)
    DB.commit()

    return make_response(
        jsonify(
            mensagem = 'Usuários deletado com sucesso'
        )
    )

@app.route('/produtos/<int:id>', methods= ['DELETE'])
def DeletarProduto(id):
    CRS = DB.cursor()
    cmd = 'DELETE FROM produtos WHERE id = %s'
    values = [id]
    CRS.execute(cmd,values)
    DB.commit()

    return make_response(
        jsonify(
            mensagem = 'Produto deletado com sucesso'
        )
    )

app.run()