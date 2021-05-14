
//    PATH :  host + /memory

const { Router } = require('express');
const { crearMemory, obtenerMemories } = require('../controllers/memoryController');
const router = Router();


router.get ('/:userID',  obtenerMemories)

router.post('/add', crearMemory  )

// router.delete ('/:id',  )

// router.put ('/:id',  )



module.exports = router