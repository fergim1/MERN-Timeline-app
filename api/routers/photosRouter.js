const { Router } = require('express');
const { addPhotos } = require('../controllers/photosController');
const router = Router();
const upload = require("../utils/multer");


//    PATH :  host + /photos

router.post('/add', upload.any("images"), addPhotos )





module.exports = router