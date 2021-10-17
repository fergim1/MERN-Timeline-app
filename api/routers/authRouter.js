const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, loginGuest } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');


//    PATH :  host + /auth

router.post('/register', 
[
    check( 'name' , 'El nombre es obligatorio').not().isEmpty(),
    check( 'email' , 'El email es obligatorio y debe ser un email válido').isEmail(),
    check( 'password' , 'El passwrod debe tener más de 3 caracteres').isLength({min: 3}),
    validarCampos
]
, crearUsuario  )

router.post('/login', 
[
    check( 'email' , 'El email es obligatorio y debe ser un email válido').isEmail(),
    check( 'password' , 'El password es obligatorio').not().isEmpty(),
    validarCampos
],
 loginUsuario  )


 router.post('/guest', 
[
    check( 'email' , 'El email es obligatorio y debe ser un email válido').isEmail(),
    validarCampos
],
 loginGuest )


module.exports = router