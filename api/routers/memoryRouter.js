//    PATH :  host + /memory

const { Router } = require('express');
const { crearMemory } = require('../controllers/memoryController');
const router = Router();


// router.get ('/',  )

router.post('/add', crearMemory  )

// router.delete ('/:id',  )

// router.put ('/:id',  )



module.exports = router