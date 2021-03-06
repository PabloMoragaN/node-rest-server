//POST - CREAR NUEVOS REGISTROS
///PUT - ACTUALIZAR DATOS


require('./config/config');


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./controller/usuarioController'));



//
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;

    console.log('Bases de datos ONLINE');


});

app.listen(process.env.PORT, () => {

    console.log('Escuchando en el puerto: ', process.env.PORT);
})