import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select('users')

      //console.log('retorno metodo handler',users)

      return res.end(JSON.stringify(users))
    }
  },

  {
    method: 'POST',
    path: buildRoutePath('/users'),
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
  },

  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      //console.log(id)

      database.delete('users', id)
      return res.writeHead(204).end()
    }
  },

  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body
      //console.log(id)

      database.update('users', id, { name, email })
      return res.writeHead(204).end()
    }
  }
]