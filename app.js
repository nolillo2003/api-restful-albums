'use strict'

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// Carga de rutas
let albumRoutes = require('./routes/album');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configurar las cabeceras

// Configurar rutas base
app.use('/api',albumRoutes);

module.exports = app;