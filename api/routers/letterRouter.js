

const { Router } = require('express');
const { addLetter, deleteLetter, UpdateLetter } = require('../controllers/letterController');
const router = Router();


//    PATH :  host + /letter


router.post('/add', addLetter  )

router.delete ('/:id', deleteLetter  )

router.put ( '/:id', UpdateLetter )



module.exports = router