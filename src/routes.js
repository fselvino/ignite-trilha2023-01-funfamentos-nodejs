import { Database } from './database.js'
import{randomUUID} from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      const users = database.select('users')

      //console.log('retorno metodo handler',users)

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      const { name, email } = req.body
      const user = {
        id: randomUUID(),
        name,
        email
      }

      //chama o metodo para criar o banco de dados do objeto database passando o nome da tabela e os dados do usuario
      database.insert('users', user)

      return res.writeHead(201).end()
    }
  }
]