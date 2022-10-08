export const saberIdUsuario = (id: string) => {

    const numero = Number(id)
    if(numero === 1){
        return "6340f8a489aa7aae94edc275"
    }else if(numero === 5){
        return '634104c2ee0f65b2948ca473'
    }else if(numero === 6){
        return '6341051fee0f65b2948ca475'
    }else if(numero === 7){
        return '6341052dee0f65b2948ca477'
    } else{
        console.log("Este id no se encontro en la funcion para identificar user")
        return false
    }
}