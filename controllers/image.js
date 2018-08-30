'use strict'

let Image = require('../models/image');
let Album = require('../models/album');

function getImage(req, res) {
    let imageId = req.params.id;

    Image.findById(imageId, (err, image) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la petición' });
        }

        if (image) {
            Album.populate(image, {path: 'album'}, (err, image) => {
                if (err) {
                    return res.status(500).send({ message: 'Error en la petición' });
                }

                if (image){
                    return res.status(200).send({ image });    
                }
            });
        } else {
            return res.status(404).send({ message: 'La imagen no existe' });
        }
    });
}

function getImages(req, res) {

    Image.find({}, (err, images) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la petición' });
        }

        if (images) {
            return res.status(200).send({ images });
        } else {
            return res.status(404).send({ message: 'No se han encontrado imagenes' });
        }
    });
}

function saveImage(req, res) {
    let image = new Image();
    let params = req.body;
    
    image.title = params.title;
    image.picture = null;
    image.album = params.album;

    image.save((err, imageStored) => {

        if (err){
            return res.status(500).send({message: 'Error al guardar la imagen'});
        }

        if (imageStored){
            return res.status(200).send({ image: imageStored });
        } else {
            return res.status(200).send({ message: 'No se ha guardado la imagen' });
        }

    });
}

function updateImage(req, res) {
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

function deleteImage(req, res) {
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
    getImage,
    getImages,
    saveImage,
    updateImage,
    deleteImage
}