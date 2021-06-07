const { Router } = require('express');
const router = Router();
const { addGuest, getGuests, deleteGuest } = require('../controllers/guestController')


//    PATH :  host + /guest

router.post ( '/add', addGuest )

router.get ( '/:userId', getGuests)

router.delete ( '/:idGuest', deleteGuest)




module.exports = router