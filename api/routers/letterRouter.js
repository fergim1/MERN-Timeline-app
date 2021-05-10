//    PATH :  host + /letter

const { Router } = require('express');
const { AddLetter } = require('../controllers/letterController');
const router = Router();


// router.get ('/',  )

router.post('/add', AddLetter  )

// router.delete ('/:id',  )

// router.put ('/:id',  )



module.exports = router