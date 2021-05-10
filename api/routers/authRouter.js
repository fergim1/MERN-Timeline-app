
//    PATH :  host + /auth

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken} = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');


router.post('/add', 
[
    check( 'name' , 'El nombre es obligatorio').not().isEmpty(),
    check( 'email' , 'El email es obligatorio y debe ser un email válido').isEmail(),
    check( 'password' , 'El passwrod debe tener más de 3 caracteres').isLength({min: 3}),
    validarCampos
]
, crearUsuario  )

router.post('/', 
[
    check( 'email' , 'El email es obligatorio y debe ser un email válido').isEmail(),
    check( 'password' , 'El password es obligatorio').not().isEmpty(),
    validarCampos
],
 loginUsuario  )

router.get ('/revalidartoken', revalidarToken  )

// router.delete ('/:id',  )

// router.put ('/:id',  )



module.exports = router