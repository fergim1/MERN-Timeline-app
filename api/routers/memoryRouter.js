
//    PATH :  host + /memory

const { Router } = require('express');
const { crearMemory, obtenerMemories, eliminarMemory, actualizarMemory } = require('../controllers/memoryController');
const router = Router();


router.get ('/:userID',  obtenerMemories)

router.post('/add', crearMemory  )

router.delete ('/:id', eliminarMemory  )

router.put ( '/:id', actualizarMemory )




module.exports = router