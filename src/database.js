//a proposta é que seja um banco de dados para receber varias informaçoes

export class Database {

  //O sustenido indica que o a variavel fica privada
  #database = {}

  //metodos
  select(table){
    const data = this.database[table] ?? []
    return data
  }

  insert(table, data){
    if(Array.isArray(this.database[table])){
      this.database[table].push(data)
    }else{
      this.database[table]=data
    }
    return
  }
}