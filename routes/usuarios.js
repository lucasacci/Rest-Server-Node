
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria y con mas de 6 caracteres").isLength({ min: 6}),
    check("correo","El correo no es valido").isEmail().withMessage("El correo no es valido"),
    check("rol","No es un rol valido").isIn(['ADMIN_ROLE','USER_ROLE'])
],usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;