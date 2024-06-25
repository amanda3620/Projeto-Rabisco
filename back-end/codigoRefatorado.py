from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector 
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

#CONEXÃO COM O DATABASE
DB_CONFIG = {
    'host':'localhost',
    'user':'root',
    'password':'senai',
    'database':'Papelaria'
}
def conecta_db():   
    conexaoDB = mysql.connector.connect(**DB_CONFIG)
    cursorDB = conexaoDB.cursor()
    return conexaoDB, cursorDB

def close_DB (conexaoDB, cursorDB):
    cursorDB.close()
    conexaoDB.close()

#CADASTRO DE PRODUTOS
@app.route('/produto', methods=['POST'])
def cadastro_produto():
    try:
        dados = request.json #receber o JSON
        nome = dados.get('nome')
        descricao = dados.get('descricao')
        preco = dados.get('preco')
        quantidade = dados.get('quantidade')

        if not all ([nome,descricao,preco,quantidade]):
            return jsonify({'Error':'Há campos vazios'}),400

        conexaoDB,cursorDB = conecta_db()
        comandoSQL = 'INSERT INTO Produto (nome,descricao,preco,quantidade) VALUES (%s,%s,%s,%s)'
        cursorDB.execute(comandoSQL,(nome,descricao,preco,quantidade,))
        conexaoDB.commit()
        return jsonify({'mensagem':'Cadastro realizado'}),201
    except Error as erro:
        return jsonify({'erro': f'{erro}'}), 500
    except KeyError:
         return jsonify({'erro':'Faltando informação'}), 500
    finally:
        close_DB(conexaoDB, cursorDB)   


#LISTAR PRODUTOS
@app.route('/produto', methods=['GET'])
def listar_produtos():
    try:
        conexaoDB,cursorDB = conecta_db()
        comandoSQL = "SELECT * FROM Produto"
        cursorDB.execute(comandoSQL)
        produtos = cursorDB.fetchall()
        if not produtos:
            return jsonify({'mensagem':'Não há produtos'}),200
        
        produtosjson = []
        for produto in produtos:
            produto_dic = {
                "idproduto":produto[0],
                "nome":produto[1],
                "descricao":produto[2],
                "preco":produto[3],
                "quantidade":produto[4]
            }
            produtosjson.append(produto_dic)

        return jsonify(produtosjson),200
    except Error as erro:
        return jsonify({'erro': f'{erro}'}), 500
    finally:
        close_DB(conexaoDB, cursorDB)   
    
 
#RETORNA UM PRODUTO
@app.route('/produto/<int:id_produto>', methods=['GET'])
def get_produto(id_produto):
    try:
        conexaoDB,cursorDB = conecta_db()
        comandoSQL = 'SELECT * FROM Produto WHERE idProduto = %s'
        cursorDB.execute(comandoSQL, (id_produto,))
        produto = cursorDB.fetchone()

        if not produto:
            return jsonify({'mensagem':'Produto não encontrado'}),200

        produtojson = {"idproduto":produto[0],
                        "nome":produto[1],
                        "descricao":produto[2],
                        "preco":produto[3],
                        "quantidade":produto[4]
                        }
        return jsonify(produtojson), 200

    except Error as erro:
        return jsonify({'erro': f'{erro}'}), 500
    finally:
        close_DB(conexaoDB, cursorDB)    


#ATUALIZAR UM PRODUTO
@app.route('/produto', methods=['PUT'])
def update_produto():
    try:
        dados = request.json
        idproduto = dados.get('idproduto')
        nome = dados.get('nome')
        descricao = dados.get('descricao')
        preco = dados.get('preco')
        quantidade = dados.get('quantidade')

        if not all ([idproduto, nome, descricao, preco, quantidade]):
            return jsonify({'Erro':'Dados incompletos'}),400
        
        conexaoDB,cursorDB = conecta_db()
        comandoSQL = 'UPDATE Produto SET nome = %s, descricao = %s, preco = %s, quantidade = %s WHERE idproduto = %s'
        cursorDB.execute(comandoSQL, (nome,descricao,preco,quantidade,idproduto))
        conexaoDB.commit()
        return jsonify({'mensagem':'Alteração realizada'}),200
    except Error as erro:
        return jsonify({'erro': f'{erro}'}), 500
    except KeyError:
         return jsonify({'erro':'Faltando informação'}), 500  
    finally:
        close_DB(conexaoDB, cursorDB)        


#EXCLUIR UM PRODUTO
@app.route('/produto', methods=['DELETE'])
def delete_produto():
    try:
        dados = request.json
        id_produto = dados.get('idproduto')
        conexaoDB,cursorDB = conecta_db()
        comandoSQL = 'DELETE FROM Produto WHERE idProduto = %s'
        cursorDB.execute(comandoSQL, (id_produto,))
        conexaoDB.commit()
        return jsonify({'mensagem':'Produto excluído'}),200
    except Error as erro:
        return jsonify({'erro': f'{erro}'}), 500
    except KeyError:
         return jsonify({'erro':'Faltando informação'}), 500  
    finally:
        close_DB(conexaoDB, cursorDB)       

# ERRO 404
@app.errorhandler(404)
def pagina_nao_encontrada(erro):
    return jsonify({'erro':'Página não encontrada'}), 404

# ERRO 405
@app.errorhandler(405)
def metodo_invalido(erro):
    return jsonify({'erro':'Método HTTP inválido'}), 405

# ERRO 500
@app.errorhandler(500)
def erro_servidor(erro):
    return jsonify({'erro':'Erro interno no servidor'}), 500





#ÚLTIMAS LINHAS
if __name__ == '__main__':
    app.run(debug=True)