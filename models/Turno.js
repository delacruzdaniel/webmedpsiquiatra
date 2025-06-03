const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    tipoConsulta: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'confirmado', 'cancelado'],
        default: 'pendiente'
    },
    mensaje: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Turno', turnoSchema); 