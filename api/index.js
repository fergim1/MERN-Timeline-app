const express = require('express');
require('dotenv').config()
const letterRouter = require('./routers/letterRouter')
const authRouter = require('./routers/authRouter');
const { dbConnection } = require('./database/config');



//Crear el servidor de express
const app = express();

// Conección a la Base de Datos
dbConnection();

// Directorio púbico
app.use( express.static('public'))

// Lectura y parseo del body
app.use( express.json() );


//Rutas 
// Autenticacion => auth
app.use('/auth', authRouter )

// OBTENER TODAS LAS MEMORIES
// CRUD Letter =>   letter
app.use('/letter', letterRouter )

// CRUD photos =>   photos
// CRUD video =>   video



// app.get('/', (req, res) =>{
//     console.log('Path = / ')
// })


//Escuchar peticiones
app.listen( process.env.PUERTO , ()=>{
    console.log( `Servidor corriendo en el puerto ${process.env.PUERTO}`)
})