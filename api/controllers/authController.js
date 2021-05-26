const { response } = require('express')
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res=response) =>{

            const { email, password} = req.body

            try {
                let usuario = await Usuario.findOne({ email });

                if ( usuario ) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'No puede registrarse porque ya existe un usuario con ese email'
                    });
                }

                usuario = new Usuario (req.body);

            // Encriptar contraseña
                const salt = bcrypt.genSaltSync();
                usuario.password = bcrypt.hashSync( password, salt );
                
                await usuario.save()

            // Generar JWT
                const token = await generarJWT( usuario.id, usuario.name );
            
                res.status(201).json({
                    ok: true,
                    uid: usuario.id,
                    name: usuario.name,
                    token
                })
                
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    ok: false,
                    msg: 'Por favor hable con el administrador'
                })
                
            }
}

const loginUsuario = async ( req, res=response ) =>{

            const { email, password } = req.body;

            const usuario = await Usuario.findOne({ email });

            if ( !usuario ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No existe ningún usuario con ese email, por favor regístrese'
                });
            }

        // Confirmar los passwords
            const validPassword = bcrypt.compareSync( password, usuario.password );

            if ( !validPassword ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Password incorrecto'
                });
            }

        // Generar JWT
            const token = await generarJWT( usuario.id, usuario.name );

            res.status(201).json({
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token
            })    
}

// const revalidarToken = (req, res=response) =>{
//     res.json({
//         ok: true,
//         msg: 'Token Revalidado',
//     })
// }


module.exports = {
    crearUsuario,
    loginUsuario,
    // revalidarToken
}