const { Router } = require('express');
const { addLetter, obtenerMemories, eliminarMemory, actualizarMemory, addPhotos, deletePhotos, searchMemories } = require('../controllers/memoryController');
const router = Router();
const upload = require("../utils/multer");


//    PATH :  host + /memory

router.get ('/:userID',  obtenerMemories)

router.put ( '/:id', actualizarMemory )
router.delete ('/:id', eliminarMemory  )

router.post('/addletter', addLetter  )
router.post('/addphotos', upload.any("images"), addPhotos )
router.delete('/deletephotos', deletePhotos )


router.get ( '/:userId/:search', searchMemories )






module.exports = router