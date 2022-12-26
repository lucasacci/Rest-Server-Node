const { response } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario");

const validarJwt = async (req, res = response, next) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

   try {
    
        const {uid} = jwt.verify(token, process.env.SECRETKEY);


        const usuario = await Usuario.findById(uid);


        req.usuario = usuario;

        next();

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