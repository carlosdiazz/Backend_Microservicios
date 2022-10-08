export const saberIdUsuario = (id: string) => {

    const numero = Number(id)
    if(numero === 1){
        return "6340f8a489aa7aae94edc275"
    }else{
        throw Error("Este id no se encontro en la funcion para identiifcar user")
    }
}