'use strict'

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// Carga de rutas
let albumRoutes = require('./routes/album');
let imageRoutes = require('./routes/image');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 * Middleware propio para establecer nuestras cabeceras (TEMA CORS, etc...)
 * De esta manera permitimos a nuestros clientes REST usar PUT, DELETE, ...
 * next() se usa para salir de la funcion
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// Configurar rutas base
app.use('/api',albumRoutes);
app.use('/api',imageRoutes);

module.exports = app;