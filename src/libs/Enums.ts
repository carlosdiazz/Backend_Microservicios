export enum Departamento_Users {
    DOCENTES                = 'DOCENTES',
    PERSONAL_ADMINISTRATIVO = 'PERSONAL_ADMINISTRATIVO'
}

export enum TANDAS_ENUM_USERS {
    MATUTINA   = 'MATUTINA',
    VESPERTINA = 'VESPERTINA'
}

export enum HORARIO_ENUM {
    HORA_ENTRADA = 'hora_entrada',
    HORA_SALIDA  = 'hora_salida'
}
export interface Registro {
    id_user?:      string;
    tanda?:        string;
    date?:         Date;
    hora_entrada?: string;
    hora_salida?:  string;
}


//export enum TANDAS {
//    TANDA = Date
//}