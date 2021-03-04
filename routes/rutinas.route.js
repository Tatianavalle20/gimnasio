'use strict';
const express = require('express');
const router = express.Router();
const Rutina = require('../models/rutinas.model');

router.post('/registrar-rutina', (req, res) => {
    let rutina = JSON.parse(req.body.obj);

    let nueva_rutina = new Rutina({
        creacion: rutina.creacion,
        vencimiento: rutina.vencimiento
    });

    rutina.lista_ejercicios.forEach(ejercicio => {
        nueva_rutina.ejercicios.push(ejercicio._id);
    });

    nueva_rutina.save((err, rutina) => {
        if (err) {
            res.json({
                msj: 'La rutina no se pudo registrar',
                err
            });
        } else {
            res.json({
                msj: 'La rutina se registró correctamente',
                rutina
            });
        }
    });
});
router.get('/listar-rutinas', (req, res) => {
    Rutina.find().populate('ejercicios').exec((err, lista) => {
        if (err) {
            res.json({
                msj: 'Las rutinas no se pudieron listar',
                err
            });
        } else {
            res.json({
                lista
            });
        }
    });
});
router.put('eliminar-ejercicio-rutina', (req, res) => {
    // Recibe el _id de la rutina, y la lista de _ids de los ejercicios a eliminar
    let ejercicios_eliminar = JSON.parse(req.body.ejercicios);
    Rutina.findById(req.body._id, (err, rutina) => {
        if (err) {
            res.json({
                msj: 'La rutina no se encontró',
                err
            });
        } else {
            ejercicios_eliminar.forEach(ejercicio => {
                rutina.ejercicios.pull(ejercicio)
            });
            rutina.save((err, rutina) => {
                if (err) {
                    res.json({
                        msj: 'La rutina no se pudo registrar',
                        err
                    });
                } else {
                    res.json({
                        msj: 'La rutina se registró correctamente',
                        rutina
                    });
                }
            });
        }
    });
});


module.exports = router;