from flask import make_response, jsonify, request
from APP import app
from APP.models import get_db_connection  

@app.route('/users', methods=['GET'])
def BuscarUsers():
    conn = get_db_connection()
    CRS = conn.cursor()
    CRS.execute('SELECT * FROM usuarios')
    data = CRS.fetchall()
    conn.close()  

    users = list()
    for US in data:
        users.append({
            'id':    US[0],
            'nome':  US[1],
            'login': US[2],
            'senha': US[3],
        })

    return make_response(jsonify(users=users))

@app.route('/produtos', methods=['GET'])
def BuscaProdutos():
    conn = get_db_connection()
    CRS = conn.cursor()
    CRS.execute('SELECT * FROM produtos')
    data = CRS.fetchall()
    conn.close()

    prod = list()
    for P in data:
        prod.append({
            'id':         P[0],
            'nome':       P[1],
            'descrição':  P[2],
            'Preço':      P[3],
            'Quantidade': P[4]
        })

    return make_response(jsonify(Produtos=prod))

@app.route('/users', methods=['POST'])
def CadastroUsers():
    data = request.json
    conn = get_db_connection()
    CRS = conn.cursor()

    CRS.execute('SELECT * FROM usuarios WHERE login = %s', (data['login'],))
    RPT = CRS.fetchone()
    if RPT:
        conn.close()
        return make_response(jsonify(mensagem='Esse login já existe'))

    cmd = 'INSERT INTO usuarios (nome, login, senha) VALUES (%s, %s, %s)'
    values = (data['nome'], data['login'], data['senha'])
    CRS.execute(cmd, values)
    conn.commit()
    conn.close()

    return make_response(jsonify(mensagem='Usuário cadastrado'))

@app.route('/produtos', methods=['POST'])
def cadastroProduto():
    data = request.json
    conn = get_db_connection()
    CRS = conn.cursor()
    
    cmd = 'INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES (%s, %s, %s, %s)'
    values = (data['nome'], data['descricao'], data['preco'], data['quantidade'])
    CRS.execute(cmd, values)
    conn.commit()
    conn.close()

    return make_response(jsonify(mensagem='Produto cadastrado'))

@app.route('/users/<int:id>', methods=['PUT'])
def AlterarUsers(id):
    data = request.json
    conn = get_db_connection()
    CRS = conn.cursor()
    
    cmd = 'UPDATE usuarios SET nome = %s, login = %s, senha = %s WHERE id = %s'
    values = (data['nome'], data['login'], data['senha'], id)
    CRS.execute(cmd, values)
    conn.commit()
    conn.close()

    return make_response(jsonify(mensagem='Usuário alterado'))

@app.route('/produtos/<int:id>', methods=['PUT'])
def AlterarProdutos(id):
    data = request.json
    conn = get_db_connection()
    CRS = conn.cursor()
    
    cmd = 'UPDATE produtos SET nome = %s, descricao = %s, preco = %s, quantidade = %s WHERE id = %s'
    values = (data['nome'], data['descricao'], data['preco'], data['quantidade'], id)
    CRS.execute(cmd, values)
    conn.commit()
    conn.close()

    return make_response(jsonify(mensagem='Produto alterado com sucesso'))

@app.route('/users/<int:id>', methods=['DELETE'])
def DeletarUsers(id):
    conn = get_db_connection()
    CRS = conn.cursor()
    
    cmd = 'DELETE FROM usuarios WHERE id = %s'
    CRS.execute(cmd, (id,))
    conn.commit()
    conn.close()

    return make_response(jsonify(mensagem='Usuário deletado com sucesso'))

@app.route('/produtos/<int:id>', methods=['DELETE'])
def DeletarProduto(id):
    conn = get_db_connection()
    CRS = conn.cursor()
    
    cmd = 'DELETE FROM produtos WHERE id = %s'
    CRS.execute(cmd, (id,))
    conn.commit()
    conn.close()

    return make_response(jsonify(mensagem='Produto deletado com sucesso'))

@app.route('/login', methods=['POST'])
def Login():
    data = request.json
    login = data.get('login')
    senha = data.get('senha')
    conn = get_db_connection()
    CRS = conn.cursor()

    CRS.execute('SELECT id, nome FROM usuarios WHERE login = %s AND senha = %s', (login, senha))
    user = CRS.fetchone()
    conn.close()

    if user:
        return make_response(jsonify(mensagen='Login realizado com sucesso'), 200)
    else:
        return make_response(jsonify(mensagen='Dados de login incorretos '),401)

