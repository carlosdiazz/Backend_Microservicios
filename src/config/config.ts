import * as dotenv from 'dotenv'
dotenv.config()

export const PORT_APP = process.env.PORT_APP || 3000
export const SECRET_JWT_TOKEN = process.env.SECRET_JWT_TOKEN || 'TOKEN-MEGA-SECRETO-ULTRA'
export const MONGO_URI = process.env.MONGO_URI || ''