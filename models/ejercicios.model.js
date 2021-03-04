'use strict';
const mongoose = require('mongoose');

const schema_ejercicio = mongoose.Schema({

    nombre: { type: String, required: true, unique: true },
    zona: { type: String, required: true, unique: false },
    estado: { type: String, required: true, unique: false }

});

module.exports = mongoose.model('Ejercicio', schema_ejercicio, 'ejercicios');