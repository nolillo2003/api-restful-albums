'use strict'

let Album = require('../models/album');

function getAlbum(req, res) {
    let albumId = req.params.id;

    Album.findById(albumId, (err, album) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la petición' });
        }

        if (album) {
            return res.status(200).send({ album });
        } else {
            return res.status(404).send({ message: 'El album no existe' });
        }
    });
}

function getAlbums(req, res) {

    Album.find({}, (err, albums) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la petición' });
        }

        if (albums) {
            return res.status(200).send({ albums });
        } else {
            return res.status(404).send({ message: 'No se han encontrado albums' });
        }
    });
}

function saveAlbum(req, res) {
    let album = new Album();
    let params = req.body;
    
    album.title = params.title;
    album.description = params.description;

    album.save((err, albumStored) => {

        if (err){
            return res.status(500).send({message: 'Error al guardar el album'});
        }

        if (albumStored){
            return res.status(200).send({ album: albumStored });
        } else {
            return res.status(200).send({ message: 'No se ha guardado el album' });
        }

    });
}

function updateAlbum(req, res) {
    let albumId = req.params.id;
    let update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if (err){
            return res.status(500).send({message: 'Error al actualizar el album'});
        }

        if (albumUpdated){
            return res.status(200).send({ album: albumUpdated });
        } else {
            return res.status(200).send({ message: 'No se ha actualizado el album' });
        }        
    });

}

function deleteAlbum(req, res) {
    let albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumDeleted) => {
        if (err){
            return res.status(500).send({message: 'Error al eliminar el album'});
        }

        if (albumDeleted){
            return res.status(200).send({ album: albumDeleted });
        } else {
            return res.status(200).send({ message: 'No se ha eliminado el album' });
        }        
    });

}

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum
}