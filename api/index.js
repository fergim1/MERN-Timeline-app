const express = require('express');
require('dotenv').config()
var cors = require('cors')
const authRouter = require('./routers/authRouter');
const memoryRouter = require('./routers/memoryRouter')
const letterRouter = require('./routers/letterRouter')
const photosRouter = require('./routers/photosRouter')

const { dbConnection } = require('./database/config');



//Crear el servidor de express
const app = express();


// Conección a la Base de Datos
dbConnection();

// CORS 
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  }
app.use(cors(corsOptions))

// Directorio púbico
app.use( express.static('public'))

// Lectura y parseo del body
app.use( express.json() );


//RUTAS 
// Autenticación
app.use('/auth', authRouter )

// Obtener todas las memories
app.use('/memory', memoryRouter )

// CRUD Letter
app.use('/letter', letterRouter )

// CRUD Photos
app.use('/photos', photosRouter )



//Escuchar peticiones
app.listen( process.env.PUERTO , ()=>{
    console.log( `Servidor corriendo en el puerto ${process.env.PUERTO}`)
})