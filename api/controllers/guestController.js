const { response } = require('express')
const Guest = require('../models/Guest')

const addGuest = async (req, res=response) => {

    const { user, email} = req.body    

    try {

        let guest = await Guest.findOne({ email });

        if ( guest ) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo agregar el invitado, porque ya existe un invidado con ese email'
            });
        }
        
        guest = new Guest (req.body);
    
        await guest.save()
    
        const guests = await Guest.find({user}).sort({ name: 'asc'}).exec();
    
        res.json( {
            ok: true,
            guests  
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }   
}

const getGuests = async (req, res=response) => {
    
    try {
        const user = req.params.userId;

        const guests = await Guest.find({user}).sort({ name: 'asc'}).exec();

        res.json( {
            ok: true,
            guests  
        })
        
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })            
    }        
}

const deleteGuest = async ( req, res=response ) => {
    
    const idGuest = req.params.idGuest
    
    try {
        
        let guest = await Guest.findById( idGuest ).exec() 
        
        if ( !guest ) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo eliminar, porque no existe ningún invitado con ese id!'
            });
        }
    
        await Guest.findOneAndDelete( { _id: idGuest });
    
        return res.json({
            ok: true,
            msg: 'Eliminado correctamente'
        })
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })        
    }
}



module.exports = {
    addGuest,
    getGuests,
    deleteGuest
 }