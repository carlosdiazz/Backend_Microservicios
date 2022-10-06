import XLSX from 'xlsx'

const leerExcel = (ruta: string) => {
    const libro = XLSX.readFile(ruta);
    const TodasHojas = libro.SheetNames;

    const hojaUna = TodasHojas[0]

    const dataExcel = XLSX.utils.sheet_to_json(libro.Sheets[hojaUna])

    console.log(dataExcel)
}

const ruta = './data.xlsx'

leerExcel(ruta)