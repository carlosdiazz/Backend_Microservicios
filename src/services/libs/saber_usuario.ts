export const saberIdUsuario = (id: string) => {

    const numero = Number(id)
    if(numero === 1){
        return "6351561c951c88cb1a0e75f7"
    }else if(numero === 5){
        return '63448e9941dd5b6366e046a7'
    }else if(numero === 6){
        return '63448eab41dd5b6366e046a9'
    }else if(numero === 7){
        return '6341052dee0f65b2948ca477'
    } else{
        console.log("Este id no se encontro en la funcion para identificar user")
        return null
    }
}