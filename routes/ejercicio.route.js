'use strict';

const express = require('express');
const router = express.Router();
const Ejercicio = require('../models/ejercicios.model');

router.post('/registrar-ejercicio', (req, res) => {
    let obj_ejercicio = JSON.parse(req.body.obj);
    let ejercicio = new Ejercicio({
        nombre: obj_ejercicio.nombre,
        zona: obj_ejercicio.zona,
        estado: 'Activo'
    });
    ejercicio.save((err, ejercicio_bd) => {
        if (err) {
            res.json({
                msj: 'El ejercicio no se pudo registrar',
                err
            });
        } else {
            res.json({
                msj: 'El ejercicio se registró correctamente',
                ejercicio_bd
            });
        }
    });

});

router.get('/listar-ejercicios', (req, res) => {
    Ejercicio.find((err, lista) => {
        if (err) {
            res.json({
                msj: 'No se encontraron ejercicios',
                err
            });
        } else {
            res.json({
                lista
            });
        }
    });
});

router.get('/buscar-ejercicio', (req, res) => {
    Ejercicio.findOne({ _id: req.query._id }, (err, ejercicio) => {
        if (err) {
            res.json({
                msj: 'No se encontró el ejercicio',
                err
            });
        } else {
            res.json({
                ejercicio
            });
        }
    });
});

router.put('/modificar-ejercicio', (req, res) => {
    let obj_ejercicio = JSON.parse(req.body.obj);
    Ejercicio.updateOne({ _id: obj_ejercicio._id }, {
        $set: {
            nombre: obj_ejercicio.nombre,
            zona: obj_ejercicio.zona,
            estado: obj_ejercicio.estado
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el ejercicio',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });

});

module.exports = router;