'use strict';
const mongoose = require('mongoose');

const schema_rutina = new mongoose.Schema({
    creacion: { type: Date, required: true, unique: false },
    vencimiento: { type: Date, required: true, unique: false },
    ejercicios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ejercicio'
    }]

});

module.exports = mongoose.model('Rutina', schema_rutina, 'rutinas');