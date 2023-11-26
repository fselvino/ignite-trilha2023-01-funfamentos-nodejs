//a proposta é que seja um banco de dados para receber varias informaçoes

import fs from 'node:fs/promises'
import { serialize } from 'node:v8'

const databasePath = new URL('../db.json', import.meta.url)
//console.log(databasePath)

export class Database {


  //O sustenido indica que o a variavel fica privada
  #database = {}

  //construtor le o arquivo de db caso nao exista cria vazio
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
  select(table, search) {

    let data = this.#database[table] ?? []

    //Object.entries converte um objeto {name: 'fernando', email: 'fernando@gmail.com'}
    //para [[name, fernando],[email, fernando@gmail.com]]
    if(search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value])=>{
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data] //cuidado se data não estiver em matrix na inclui dados
    }

    //persiste os dados
    this.#persist()
    return
  }

  delete(table, id){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    
    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  update(table,id, data){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)  

    if(rowIndex > -1){
      this.#database[table][rowIndex]={id, ...data}
      this.#persist()
    }
  }
}