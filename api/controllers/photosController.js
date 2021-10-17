const { response } = require('express')
const Memory = require('../models/Memory')
const cloudinary = require("../utils/cloudinary");



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

        res.json({
            ok: true,
            memory: memoryGuardada
        })
    } 
    catch (err) {
      console.log(err);
    }
  };

module.exports = {
    addPhotos
}