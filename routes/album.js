'use strict'

let express = require('express');
let albumController = require('../controllers/album');
let api = express.Router();

api.get('/album/:id',albumController.getAlbum);
api.get('/albums/',albumController.getAlbums);
api.post('/album',albumController.saveAlbum);
api.put('/album/:id',albumController.updateAlbum);
api.delete('/album/:id',albumController.deleteAlbum);

module.exports = api;