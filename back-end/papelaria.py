# AULA 13

import os
import mysql.connector #drive BD MySql

# CONEXÃO COM O BANCO
conexaoDB = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password = 'senai',
    database = 'papelaria'
)

def funcao_para_cadastrar():
    imprimir_header()
    print("*** CADASTRO DE PRODUTOS ***")
    nome = input("Informe o nome do produto: ")
    descricao = input("Digite a descrição: ")

    try:
        preco = float(input("Preço: "))
        quantidade = int(input("Quantidade: "))
    except ValueError:
        print("Erro! Preço e quantidade devem ser valores numéricos.")
        return #Retorna para o Menu 
    
    # VALIDAÇÃO 
    if (not nome) or (not descricao) or (not preco) or (not quantidade):
        print("Error! Todos os campos devem ser preenchidos!")
        return #Retorna para o Menu principal
    
    if (preco < 0) or (quantidade < 0):
        print("Error! Preço e quantidade não podem ser menores que 0")
        return
    
    if len(nome) > 50:
        print("Error! O nome do produrto é maior que 50 caracteres!")
        return # Retorna para o Menu 
    
    # FIM DA VALIDAÇÃO 

    comandoSQL = f'INSERT INTO Produto VALUES (null, "{nome}", "{descricao}", {preco}, {quantidade})'

    try:
        cursorDB = conexaoDB.cursor()
        cursorDB.execute(comandoSQL)
        conexaoDB.commit()
    except mysql.connector.Error as Erro:
        print(f"Erro! Falha ao cadastrar: {Erro}")
        return
    
    print("*** Ok! Cadastro realizado com sucesso! ***")
    cursorDB.close()


def imprimir_header():
    os.system('cls')
    print(" -" * 14)
    print("| *** SISTEA PAPELARIA ***  |")
    print(" -" * 14)
    return


# FUNÇÃO PARA MOSTRARA PRODUTOS
def listar_produtos():
    imprimir_header()
    print("*** LISTA DE PRODUTOS ***")

    try:
        cursorDB = conexaoDB.cursor()
        cursorDB.execute('SELECT * FROM Produto')
        resultado = cursorDB.fetchall() #o fetchall pega um objeto e distribui ele em uma lista de tuplas
        
        if not resultado:
            print("Não há produtos cadastrados!")
        else:
            for produto in resultado:
                print(f"ID: {produto[0]} - NOME: {produto[1]} - DESCRIÇÃO: {produto[2]} - PREÇO: {produto[3]} - QUANTIDADE {produto[4]} ")
                print("- " * 70)
    except  mysql.connector.Error as Erro:
        print(f"Erro! Falha ao listar: {Erro}")
      
    cursorDB.close()

def get_produto(id_produto):
    cursorDB = conexaoDB.cursor()
    comandoSQL = f'SELECT * FROM Produto WHERE idProduto =  {id_produto}'
    cursorDB.execute(comandoSQL)
    resultado = cursorDB.fetchone()
    cursorDB.close()
    return resultado

def excluir_produto():
    imprimir_header()
    print("*** EXCLUIR PRODUTO ***")
    
    try:
        id_produto = int(input("Informe o ID do produto: "))
    except ValueError:
        print("Erro! ID deve ser numérico!")
        return
    
    produto = get_produto(id_produto)
    
    if not produto: 
        print(f"Produto com o ID {id_produto} não encontrado!")
        return 
    
    print("Produto encontrado!")
    print(f"ID: {produto[0]} - NOME: {produto[1]}")

    confirma = input("Digite S para confirmar a exclusão: ")
    if confirma != 'S' and confirma != "s":
        print("Exclusão cancelada!")
        return
    
    try:
        cursorDB = conexaoDB.cursor()
        comandoSQL = f"DELETE FROM Produto WHERE idProduto = {id_produto}"
        cursorDB.execute(comandoSQL)
        conexaoDB.commit()
    
    except mysql.connector.Error as Erro:
        print(f'Erro: Falha na exclusão: {Erro}')
        return
    print("Ok! Produto excluido com sucesso!")

def altera_quantidade():
    imprimir_header()
    print("*** ALTERAR A QUANTIDADE ***")
    
    try:
        id_produto = int(input("Informe o ID do produto: "))
    except ValueError:
        print("Erro! ID deve ser numérico!")
        return
    
    produto = get_produto(id_produto)
    
    if not produto: 
        print(f"Produto com o ID {id_produto} não encontrado!")
        return 
    
    print("Produto encontrado!")
    print(f"ID: {produto[0]} - NOME: {produto[1]} - QUANTIDADE ATUAL: {produto[4]}")

    try:
        nova_quant = int(input("Informe a nova quantidade: "))

    except ValueError:
        print("Error! Valor da quantidade deve ser número inteiro!")
        return #Retorna para o Menu
    # VALIDAÇÕES
    if nova_quant == produto[4]:
        print("A quantidade informada é igual a anterior!")
        return

    if nova_quant < 0:
        print("A quantidade informada não pode ser negativa!")
        return
    
    # FIM DA VALIDAÇÃO

    try: 
        comandoSQL = f'UPDATE Produto SET quantidade = {nova_quant} WHERE idProduto = {id_produto}'
        cursorDB = conexaoDB.cursor()
        cursorDB.execute(comandoSQL)
    
    except mysql.connector.Error as Erro:
        print(f'Erro: Falha na atualização: {Erro}')

    print("OK! Atualização realizada com sucesso!")
    cursorDB.close()

def alterar_preco():
    imprimir_header()
    print("*** ALTERAR O PREÇO ***")
    
    try:
        id_produto = int(input("Informe o ID do produto: "))
    except ValueError:
        print("Erro! ID deve ser numérico!")
        return
    
    produto = get_produto(id_produto)
    
    if not produto: 
        print(f"Produto com o ID {id_produto} não encontrado!")
        return 
    
    print("Produto encontrado!")
    print(f"ID: {produto[0]} - NOME: {produto[1]} - PREÇO ATUAL: {produto[3]}")

    try:
        novo_preco = float(input("Informe o novo preço do produto: "))

    except ValueError:
        print("Error! Valor da preço deve ser um número!")
        return #Retorna para o Menu
    # VALIDAÇÕES
    if novo_preco == produto[4]:
        print("O preço informada é igual ao anterior!")
        return

    if novo_preco < 0:
        print("O preço informada não pode ser negativo!")
        return
    
    if novo_preco > 1000:
        print("O valor não pode ser tão alto!")
        return
    
    # FIM DA VALIDAÇÃO

    try: 
        comandoSQL = f'UPDATE Produto SET preco = {novo_preco} WHERE idProduto = {id_produto}'
        cursorDB = conexaoDB.cursor()
        cursorDB.execute(comandoSQL)
    
    except mysql.connector.Error as Erro:
        print(f'Erro: Falha na atualização: {Erro}')

    print("OK! Atualização realizada com sucesso!")
    cursorDB.close()



# Programa principal 
while True:
    imprimir_header()
    print('Informe a opção desejada: ')
    print('1 - Cadastrar produto: ')
    print('2 - Alterar quantidade: ')
    print('3 - Alterar preço: ')
    print('4 - Mostrar todos os produtos: ')
    print('5 - Excluir um produto: ')
    print('6 - Encerrar o sistema: ')
    opcao = input("Informa a opção desejada: ")

    if opcao == '1':
        funcao_para_cadastrar()
    elif opcao == '2':
        altera_quantidade()
    elif opcao == '3':
       alterar_preco()
    elif opcao == '4':
        listar_produtos()
    elif opcao == '5':
        excluir_produto()
    elif opcao == '6':
        break
    else:
        print("Opção inválida!")

    os.system('pause')
print("Sistema encerrado!")