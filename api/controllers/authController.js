const { response } = require('express')
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt');
const Guest = require('../models/Guest');

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


const loginGuest = async ( req, res=response ) =>{

    const { email } = req.body;

    let guest = await Guest.findOne({ email });

    if ( !guest ) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe ningún invitado con ese email'
        });
    }

    const idUser = guest.user
    let usuario = await Usuario.findById( idUser ).exec() 

// Generar JWT
    const token = await generarJWT( usuario.id, usuario.name );

    res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        guestName: guest.name,
        guestId: guest._id,
        token
    })    
}


module.exports = {
    crearUsuario,
    loginUsuario,
    loginGuest
}