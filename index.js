'use strict'

let mongoose = require('mongoose');
let app = require('./app.js');
let port = process.env.port || 3700;

mongoose.connect('mongodb://localhost:27017/albums',{ useNewUrlParser: true },(err,res) => {
    if (err){
        throw err;
    } else {
        console.log("Base de datos funcionando correctamente...");
        app.listen(port, () => {
            console.log("Api RESTful albums a la escucha...");
        });
    }
});