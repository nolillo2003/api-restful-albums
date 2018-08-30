'use strict'

let express = require('express');
let imageController = require('../controllers/image');
let api = express.Router();

api.get('/image/:id',imageController.getImage);
api.get('/images/',imageController.getImages);
api.post('/image',imageController.saveImage);
api.put('/image/:id',imageController.updateImage);
api.delete('/image/:id',imageController.deleteImage);

module.exports = api;