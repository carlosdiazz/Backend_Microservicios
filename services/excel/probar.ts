import XLSX from 'xlsx'

//const saberIdUsuario = (id: string) => {
//
//    const numero = Number(id)
//    if(numero === 1){
//        return "633f840bc5ec4589810ce328"
//    }
//    return '633f840bc5ec4589810ce328'
//
//}
//
//const prepararJson = (data: object) => {
//
//    const newData = {}
//    const idData = saberIdUsuario(data['Work ID'])
//    let hora_entrada : string
//    let hora_salida : string
//
//    if(data['1'] === '00:00'){
//        hora_entrada = data['2']
//        hora_salida  = data['3']
//
//    }else{
//        hora_entrada = data['1']
//        hora_salida  = data['2']
//    }
//
//    newData['id_user'] = idData
//    newData['tanda'] = "MATUTINA"
//    newData['hora_entrada'] = new Date(data['Record date']+" "+hora_entrada)
//    newData['hora_salida'] = new Date(data['Record date']+" "+hora_salida)
//    newData['date'] = new Date(data['Record date'])
//    return newData
//}
//
//
const leerExcel = async(ruta: string) => {
    const libro = XLSX.readFile(ruta);
    const TodasHojas = libro.SheetNames;

    const hojaUna = TodasHojas[0]

    const dataExcel = XLSX.utils.sheet_to_json(libro.Sheets[hojaUna])

    //let json;

    dataExcel.forEach(async(data) => {
        console.log(data)
        //json = data as object
        //console.log(prepararJson(json))

    })


}

const ruta = './probar.xlsx'

leerExcel(ruta)