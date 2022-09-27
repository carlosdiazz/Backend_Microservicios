import { createClient } from 'redis';

export const insertar_redis = async(key:string,value:string) => {
    try {
        const client = createClient();
        await client.connect()
        await client.set(key, value);
        await client.expire(key, 60*60)
        await client.quit()

    }catch(error){
        console.log('👎👎👎 Error publicando en REDIX 👎👎👎');
        //return error
    }
}

export const obtener_redis = async(key:string) => {
    try {
        const client = createClient();
        await client.connect()
        const data = await client.get(key);
        await client.quit()
        if(data){
            return data
        }else{
            return false
        }
    }catch(error){
        console.log('👎👎👎 Error obteniendo de REDIX 👎👎👎');
        return false
    }
}