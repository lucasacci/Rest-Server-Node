
const mongoose = require('mongoose')


const dbConnection = async()=>{

    try {
        
        await mongoose.connect(process.env.MONGODB_ATLAS);

        console.log('Base de datos conectada');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }

}


module.exports = {
    dbConnection
}