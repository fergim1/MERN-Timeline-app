const { response } = require('express')
const Memory = require('../models/Memory')
const cloudinary = require("../utils/cloudinary");


const obtenerMemories = async ( req, res=response ) =>{
    const user  = req.params.userID    
    try {

          // Get memories by date
        const memories = await Memory.find({user}).sort({ date: 'asc'}).exec();       

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

const actualizarMemory = async ( req, res = response ) => {

    const memoryId = req.params.id;
    const memoryNew = req.body;
    const user = req.body.user;

    try {
        const memory = await Memory.findById( memoryId );

        if ( !memory ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se puede modificar, porque no existe ningúna memory con ese id'
            })
        }

        await Memory.findByIdAndUpdate( memoryId, memoryNew, {new: true})
        //  El objeto ultimo { new: true} lo pongo para que me devuelva el objeto actualizado, sino me devuelve el anterior de actualizar
      
        // Get memories by date
        const memories = await Memory.find({user}).sort({ date: 'asc'}).exec(); 

       return res.json({
            ok: true,
            memories
        })        

        
    } catch (error) {
        console.log(error);
       return  res.status(500).json({
            ok:false,
            msg: ' Hable con el administrador'
        })
        
    }
}

const eliminarMemory = async  ( req, res=response ) => {
    
    const memoryId = req.params.id;

    try {
        const memory = await Memory.findById( memoryId ).exec() ;
                
        if ( !memory)  {
            return res.status(404).json({
                ok: false,
                msg: 'No se puede eliminar, porque no existe ninguna memoria con ese id'
            })
        }

        const photos = memory.images
        if (photos.length > 0) {
            // Delete image from cloudinary
            for (let i = 0; i < photos.length; i++) {
                const idPhoto = photos[i].public_id;
                await cloudinary.uploader.destroy(idPhoto);
            }
        }
        
        await Memory.findOneAndDelete( { _id: memoryId });

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

const addLetter = async (req, res = response) =>{
    const user = req.body.user
    const memory = new Memory (req.body)
    
    try { 
        // Add user to memory       
        memory.user = req.body.user
        // Save memory
        await memory.save()

        // Get memories by date
        const memories = await Memory.find({user}).sort({ date: 'asc'}).exec();

        res.json({
            ok: true,
            memories
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })        
    }  
}

const addPhotos =  async ( req, res = response )  => {
    const { date, title, message, user, author } = req.body 
    const files = req.files     
    try {
        let dataCloudinaryImages = []
        for (let i = 0; i < files.length; i++) {
            // Upload image to cloudinary one for one and save response in array 'dataCloudinaryImages'
            const cloudResp = await cloudinary.uploader.upload( files[i].path);
            dataCloudinaryImages.push(cloudResp )
        }
            // Creo la memory
        const memory = new Memory ({
            date, 
            title, 
            message, 
            images: dataCloudinaryImages,
            user, 
            author

        })
        // Save memory 
        const memoryGuardada = await memory.save()

        // Get memories by date
        const memories = await Memory.find({user}).sort({ date: 'asc'}).exec();

        res.json({
            ok: true,
            memories
        })
    } 
    catch (err) {
      console.log(err);
    }
  };

  const deletePhotos =  async ( req, res = response )  => {
      res.json({
          ok: true,
          msg: 'Eliminar fotos'
      })
  }


module.exports = {
    obtenerMemories,
    actualizarMemory,
    eliminarMemory,
    addLetter,
    addPhotos,
    deletePhotos
}