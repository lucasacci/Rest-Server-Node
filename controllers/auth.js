const { response } = require("express");
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJwt } = require("../helpers/generarJwt");

const login = async(req, res = response) =>{

    const { correo, password } = req.body;


    try {
        
        //Verificar si email existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - correo'
            })
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password'
            })
        }

        //Generar jwt
        const token = await generarJwt(usuario.id);



        res.json({
            usuario,
            token
        })
    

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            msg: 'Algo salio mal hable con el administrador'
        })
    }

}


module.exports = {
    login
}