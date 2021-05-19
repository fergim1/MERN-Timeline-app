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
        
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })        
    }


} 

const eliminarMemory = async  ( req, res=response ) => {
    
    const memoryId = req.params.id;

    try {
        const memory = await Memory.findById( memoryId );

        const user = memory.user; // usuario quien creó la memory (Por ahora no lo uso)

        if ( !memory)  {
            return res.status(404).json({
                ok: false,
                msg: 'No se puede eliminar, porque no existe ninguna memoria con ese id'
            })
        }

        await Memory.findOneAndDelete( memoryId );

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


const actualizarMemory = async ( req, res = response ) => {

    const memoryId = req.params.id;
    const memoryNew = req.body

    try {
        const memory = await Memory.findById( memoryId );

        if ( !memory ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se puede modificar, porque no existe ningúna memory con ese id'
            })
        }

        const memoryActualizada = await Memory.findByIdAndUpdate( memoryId, memoryNew, {new: true})
        //  El objeto ultimo { new: true} lo pongo para que me devuelva el objeto actualizado, sino me devuelve el anterior de actualizar
        
       return res.json({
            ok: true,
            msg: 'Memory Actualizada',
            memoryActualizada
        })        

        
    } catch (error) {
        console.log(error);
       return  res.status(500).json({
            ok:false,
            msg: ' Hable con el administrador'
        })
        
    }
}


module.exports = {
    crearMemory,
    obtenerMemories,
    eliminarMemory,
    actualizarMemory
}