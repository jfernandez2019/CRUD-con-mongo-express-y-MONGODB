const express = require('express')
const {config} = require('dotenv')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

config()

//pueden ser varias rutas y tambien pueden existir varios modelos
//los modelos se encuentran en el modelo hecho en moongose
const bookRoutes = require('./routes/routes.models')
//Usamos express para usar los middleware
const app = express();
// necesito un parseador para usar lo que pasa el middleware
app.use(bodyparser.json())

//Conectaremos la base de datos
mongoose.connect(process.env.MONGO_URL,{dbName: process.env.MONGO_DB_NAME})
const db = mongoose.connection
//Usamos otro middleware para leer las rutas 
app.use('/books', bookRoutes)
const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Servidor iniciando en el puerto ${port}`)
})

