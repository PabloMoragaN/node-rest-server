const express = require('express');
const Usuario = require('../models/usuario'); //Importacion del modelo usuario
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');


app.get('/usuario', function(req, res) {



    //Parametros opcionales se mandan con ?desde=10 en la url del postman
    let desde = Number(req.query.desde) || 0; //Si no hay parametro desde el default es 0

    let limite = Number(req.query.limite) || 5;
    //{estado:true} solo usuarios activos

    //el find nos sirve para encontrar en el "arreglo" y en este caso filtramos con limit
    Usuario.find({ estado: true }) //.find({},'nombre email') se presentaran los campos nombre email de Usuario en el postman
        .skip(desde) //se salta los primeros #desde registros
        .limit(limite) //#limite registros de los 16 totales, en este caso del 6-10
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({ estado: true }, (err, conteo) => { //condiciones
                res.json({
                    ok: true,
                    usuarios,
                    count: conteo

                });
            })

        });

});



app.post('/usuario', function(req, res) {
    //este body es el que aparece cuando el bodyparser procese los
    //payload que reciban las peticiones
    let body = req.body;


    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });

    }); //save es de mongoose
});

app.put('/usuario/:id', function(req, res) {

    //reques.getParameter()
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //Todas las properties validas que serán actualizadas se cogen con el pick (paquete underscore)
    //let body = req.body;



    /** id, objeto a updatear y el callback. El new es para que nos devuelva
     registro actualizado en la peticion put. runValidators es para que las validaciones (eg rolesValidos) se apliquen
     en se metodo**/
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioUpdated) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioUpdated
        });
    });
})


app.delete('/usuario/:id', function(req, res) {
    //Normalmente no se suelen borrar fisicamente para mantener la integridad estructural

    //reques.getParameter()
    let id = req.params.id;
    //let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //Todas las properties validas que serán actualizadas se cogen con el pick (paquete underscore)
    let body = req.body;

    let cambiaEstado = {
        estado: false
    }



    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }


        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

});




//Borrado Fisico
/* app.delete('/usuario/:id', function(req, res) {
    //Normalmente no se suelen borrar fisicamente para mantener la integridad estructural


    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }


        res.json({
            ok: true,
            usuario: usuarioBorrado
        });



    });



}); */

module.exports = app;