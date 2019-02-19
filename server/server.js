//POST - CREAR NUEVOS REGISTROS
///PUT - ACTUALIZAR DATOS


require('./config/config');

const express = require('express')
const app = express();
const bodyParser = require('body-parser');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/usuario', function(req, res) {
    res.json('getUser')
})

app.post('/usuario', function(req, res) {

    //este body es el que aparece cuando el bodyparser procese los
    //payload que reciban las peticiones
    let body = req.body;
    //Codigos de respues del pdf
    if (body.nombre === undefined) {
        res.status(400).json({

            ok: false,
            mensaje: 'El nombre es necesario'
        });

    } else {
        res.json({
            persona: body
        });
    }






})

app.put('/usuario/:id', function(req, res) {

    //reques.getParameter()
    let id = req.params.id;
    res.json({
        id
    });
})

app.delete('/usuario', function(req, res) {
    res.json('deleteUser')
})

app.listen(process.env.PORT, () => {

    console.log('Escuchando en el puerto: ', process.env.PORT);
})