const { response } = require('express')

const AddLetter = (req, res=response) =>{
    console.log(req.body)
    res.json({
        ok: true,
    })
}

module.exports = {
    AddLetter,
}