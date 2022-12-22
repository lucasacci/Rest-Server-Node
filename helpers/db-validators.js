const Role = require('../models/rol');
const usuario = require('../models/usuario');

const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async(email = '') =>{
    const existeEmail = await usuario.findOne({correo});

    if(existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}


module.exports = {
    esRoleValido,
    emailExiste
}