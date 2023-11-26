//importaçao de modulos internos por padrão coloca-se o prefixo node:

import http from 'node:http'
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

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

 try{
  req.body = JSON.parse(Buffer.concat(buffers).toString())
 }catch {
  req.body = null
 }
  

  

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const {name, email} = req.body

    users.push({
      id: 1,
      name,
      email
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})
server.listen(3333)