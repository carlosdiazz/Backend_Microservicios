import boom from '@hapi/boom'
import moment from 'moment'


export const calculoDeHora = async(hora_entrada: Date, hora_salida: Date) => {
    const hora_1 = moment(hora_entrada)
    const hora_2 = moment(hora_salida)
    const minutos = hora_2.diff(hora_1 , 'minutes')
    const total_hora = Math.round(minutos/60)
    if(total_hora >= 8){
        throw boom.badData("Sobrepasaste el intervalo de hora disponible")
    }
    return total_hora
}

