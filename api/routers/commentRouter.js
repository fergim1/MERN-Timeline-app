const { Router } = require('express');
const router = Router();
const { addComment, getComments, deleteComment } = require('../controllers/commentController')


//    PATH :  host + /comment

router.post ( '/add', addComment )

router.get('/:memoryId', getComments)

router.delete ( '/', deleteComment)




module.exports = router