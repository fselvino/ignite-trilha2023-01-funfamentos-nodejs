//importaçao de modulos internos por padrão coloca-se o prefixo node:

import http from 'node:http'

import { json } from './middlewares/json.js'
import { routes } from './routes.js'

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
 * 
 * AS TRÊS FORMAS DE UMA APLICAÇÃO ENVIAR INFORMAÇÕES PARA O BACK-END
 * 1º  Query Parameters: Enviamos no endereço da requisição ex GET http://localhost:3333/users?userId=1&name=Fernando => muito utilizado para Filtros, Paginação, busca etc;
 * 2º  Route Paramentes: Parametros não nomeados e que tambem ficam na rota ex DELETE http://localhost:3333/user/1 => muito utilizado para identificar um recurso;
 * 3º  Request Body: Envio de informações de um formulário passam pelo trotocolo (HTTPs)
 * 
 */



const server = http.createServer(async (req, res) => {
  const { method, url } = req

  //middleware que realiza a agregação do boffer vindo da aplicação
  await json(req, res)

  //rotas da aplicação
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

 //console.log(route)

  if (route) {
     const routeParams = req.url.match(route.path)

     req.params = {...routeParams.groups}
     
    return route.handler(req, res)
  }

  
  return res.writeHead(404).end()
})
server.listen(3333)