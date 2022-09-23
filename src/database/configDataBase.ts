import mongoose from "mongoose";
import {MONGO_URI} from "../config/config";


export const connectMongoDb = async () => {
    try {
        const db = await mongoose.connect(MONGO_URI);
        console.log(`Se conecto a la Base de Datos 💪💪💪 => ${db.connection.db.databaseName}`);
    } catch (error) {
        console.log('👎👎👎 Error conectando a la base de dato 👎👎👎');
        console.log(error);
    }
};