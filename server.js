require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rutas para páginas individuales
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/servicios', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'servicios.html'));
});

app.get('/turnos', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'turnos.html'));
});

app.get('/sobre-mi', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'sobre-mi.html'));
});

app.get('/preguntas-frecuentes', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'preguntas-frecuentes.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Accede a http://localhost:${PORT}`);
}); 