//importaçao de modulos internos por padrão coloca-se o prefixo node:

import http  from 'node:http'




const server =http.createServer((req, res)=>{
  return res.end('Hello World')
})
server.listen(3333)