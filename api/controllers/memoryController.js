const { response } = require('express')
const Memory = require('../models/Memory')



const crearMemory = async (req, res = response) =>{

    const memory = new Memory (req.body)
    
    try {        
        memory.user = req.body.user
        const memoryGuardada = await memory.save()
        res.json({
            ok: true,
            memory: memoryGuardada
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })        
    }  
}

const obtenerMemories = async ( req, res=response ) =>{
    
    const user  = req.params.userID    

    try {
        const memories = await Memory.find({user}).exec();

        if ( memories ) {
            res.json({
                ok: true,
                memories
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })        
    }


} 



module.exports = {
    crearMemory,
    obtenerMemories
}