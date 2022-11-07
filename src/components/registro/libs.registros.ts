
export const agregar_tanda = (array, newTanda: object, tanda) => {
    const agregar = array.every((item) => item.tanda !== tanda)
    if (agregar) {
        array.push(newTanda)
    }
    return array
}