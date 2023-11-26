//importaçao de modulos internos por padrão coloca-se o prefixo node:

import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
/**
 * Teremos as seguintes rotas
 * Criar usuario
 * listagem de usuario
 * ediçao de usuario
 * remoção de usuario
 * entre outras dentro da demanda da aplicação
 * 
 * Principais metodos HTTP
 * GET, POST, PUT, PATCH, DELETE
 * 
 * GET => Busca um recurso do back-end
 * POST => criar um recurso no back-end
 * PUT => Atualizar um recurso no back-end
 * PATCH => Atualiar uma informação especifica de um recurso no back-end
 * DELETE => Deletar um recurso do back-end
 * 
 * Iremos diferenciar qual metodo usar na requesiçao utilizando a soma da URL + METODO
 * 
 * GET/users => Estamos buscando usuários no back-end
 * POST/users => Estamos criando um usuário no back-end
 * 
 * Cabeçahos (Requisição/Resposta) => Metadados
 * 
 * HTTP  Status Code 
 * local de procura sobre mdn http status code
 */

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  //middleware que realiza a agregação do boffer vindo da aplicação
  await json(req, res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return res      
      .end(JSON.stringify(users))
  }


  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

   const user = {
      id: 1,
      name,
      email
    }

    //chama o metodo para criar o banco de dados do objeto database passando o nome da tabela e os dados do usuario
    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})
server.listen(3333)