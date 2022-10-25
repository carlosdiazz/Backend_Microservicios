import {PORT_APP} from './config/config'
import app from './app/app'
import {connectMongoDb} from './database/configDataBase'

const main = async ()=>{
    try{
        console.log(`🔥🔥🔥🔥🔥Subiendo el servidor🔥🔥🔥🔥🔥`)
        await connectMongoDb()
        app.listen(PORT_APP as number,"0.0.0.0" ,() => {
            //console.log(`👍El server esta arriba en el puerto: ${PORT_APP} 👍💪`)
            console.log(`👍El server esta arriba en el puerto: ${PORT_APP} 👍💪`)
        })
    }catch(error){
        console.log(error)
    }
}

main()