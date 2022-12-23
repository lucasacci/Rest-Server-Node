const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
  const { limite = 0, desde = 0 } = req.query;
 
  const resp = await Promise.all([
    Usuario.countDocuments(),
    Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite)),
  ]);

  res.json({
    resp
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // verificar si el correo existe

  //encriptar pass
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // guardar en db
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    //borrado fisico
    // const usuario = await Usuario.findByIdAndDelete(id);

    const {uid} = req.uid

    const usuario = await Usuario.findByIdAndUpdate(id);

    

    res.json({usuario, uid});
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
