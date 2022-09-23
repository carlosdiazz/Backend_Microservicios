import bcrypt from 'bcrypt'

export const encryptPassword = async (password: string) => {
    const alt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, alt)
}

export const comparePassword = async(password : string, receivedPassword: string) => {
    return await bcrypt.compare(password, receivedPassword )
}