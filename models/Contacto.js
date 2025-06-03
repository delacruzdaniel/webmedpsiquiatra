const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
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
    mensaje: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['nuevo', 'leído', 'respondido'],
        default: 'nuevo'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contacto', contactoSchema); 