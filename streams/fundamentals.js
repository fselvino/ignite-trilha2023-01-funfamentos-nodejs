// Netflix e Spotify

//Importção de clientes via CSV (Excel)

//stdin - stream de leitura
//stdout - stream de escrita

//process.stdin
 // .pipe(process.stdout)//pipe metodo que encaminha a informaçao recebida

 import {Readable} from 'node:stream'

 class OneToHundredStream extends Readable {
  index = 1

  //metodo obrigatorio _read retorna quais sao os dados 
  _read(){
    const i = this.index++

    setTimeout(() => {
      if( i > 100) {
        this.push(null)
      }else{
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000);
    
  }
 }

 new OneToHundredStream().pipe(process.stdout)