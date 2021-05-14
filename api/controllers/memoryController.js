const { response } = require('express')
const Memory = require('../models/Memory')
// const moment = require('moment')

const crearMemory = async (req, res = response) =>{
    // console.log(req.body)
    // console.log(req.body.user)
    // const date = moment(req.body.date)
    // req.body.date = date
    const memory = new Memory (req.body)
    console.log(memory)
    
    try {        
        memory.user = req.body.user
        const memoryGuardada = await memory.save()
        res.json({
            ok: true,
            memory: memoryGuardada
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })        
    }  
}



module.exports = {
    crearMemory,
}