
const mongoose = require('mongoose')

const db = async() => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("CONEXION EXITOSA A LA BASE DE DATOS")
    } catch(error) {
        console.log('NO SE PUDO CONECTAR A LA BASE DE DATOS')
    }
}

module.exports = {db}