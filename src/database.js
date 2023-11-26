//a proposta é que seja um banco de dados para receber varias informaçoes

import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)
console.log(databasePath)

export class Database {


  //O sustenido indica que o a variavel fica privada
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8', import.meta.url)
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })

  }

  //metodo privado para persistir os dados em um arquivo de texto
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  //metodos
  select(table) {
    const data = this.#database[table] ?? []
    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = data
    }

    //persiste os dados
    this.#persist()
    return
  }
}