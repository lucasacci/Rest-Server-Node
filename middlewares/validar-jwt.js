const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJwt = (req, res = response, next) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

   try {
    
        const {uid} = jwt.verify(token, process.env.SECRETKEY);

        req.uid = uid;

        next()

   } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })

   }
}


module.exports = {
    validarJwt
}