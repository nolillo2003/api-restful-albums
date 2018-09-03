'use strict'

let express = require('express');
let imageController = require('../controllers/image');
let api = express.Router();
let multipart = require('connect-multiparty');

// Aqui indicamos al middleware la ruta donde se guardaran las imagenes
let multipartMiddleware = multipart({uploadDir: './uploads'});

api.get('/image/:id',imageController.getImage);
api.get('/images/:album?',imageController.getImages);
api.post('/image',imageController.saveImage);
api.put('/image/:id',imageController.updateImage);
api.delete('/image/:id',imageController.deleteImage);
api.post('/upload-image/:id',multipartMiddleware, imageController.uploadImage);



module.exports = api;