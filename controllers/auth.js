const { response } = require("express");
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJwt } = require("../helpers/generarJwt");
const { googleVerify } = require("../helpers/google-verify");

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


const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;
    
    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol:'USER_ROLE',
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar jwt
        const token = await generarJwt(usuario.id);
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        console.log(error);
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }



}

module.exports = {
    login,
    googleSignIn
}