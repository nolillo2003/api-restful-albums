'use strict'

let path = require('path');
let fs = require('fs');
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
    let albumId = req.params.album;
    let find = null;

    if (albumId){
        // Obtenemos las imagenes del album
        find = Image.find({album: albumId}).sort('title');        
    } else {
        // Obtenemos todas las imagenes (orden titulo descendente)
        find = Image.find({}).sort('title');
    }

    find.exec((err, images) => {
        if (err){
            return res.status(500).send({ message: 'Error en la petición' });
        }

        if (images) {                
            Album.populate(images, {path: 'album'}, (err, images) => {
                if (err) {
                    return res.status(500).send({ message: 'Error en la petición' });
                }

                if (images){
                    return res.status(200).send({ images });    
                }
            }); 

            //return res.status(200).send({ images: images });
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
            return res.status(404).send({ message: 'No se ha guardado la imagen' });
        }

    });
}

function updateImage(req, res) {
    let imageId = req.params.id;
    let update = req.body;

    Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) => {
        if (err){
            return res.status(500).send({message: 'Error al actualizar la imagen'});
        }

        if (imageUpdated){
            return res.status(200).send({ image: imageUpdated });
        } else {
            return res.status(404).send({ message: 'No se ha actualizado la imagen' });
        } 
    });
}

function deleteImage(req, res) {
    let imageId = req.params.id;

    Image.findByIdAndRemove(imageId, (err, imageDeleted) => {
        if (err){
            return res.status(500).send({message: 'Error al eliminar la imagen'});
        }

        if (imageDeleted){
            return res.status(200).send({ image: imageDeleted });
        } else {
            return res.status(404).send({ message: 'No se ha eliminado la imagen' });
        }        
    });

}

function uploadImage(req, res){
    let imageId = req.params.id;
    let fileName = 'n/a';

    if (req.files){
        // Nos llega un parámetro que llama image y obtenemos el nombre del fichero
        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');

        fileName  = fileSplit[1];

        Image.findByIdAndUpdate(imageId, {picture: fileName}, (err, imageUpdated) => {
            if (err){
                return res.status(500).send({message: 'Error al actualizar la imagen'});
            }
    
            if (imageUpdated){
                return res.status(200).send({ image: imageUpdated });
            } else {
                return res.status(404).send({ message: 'No se ha actualizado la imagen' });
            } 
        });        
    } else {
        return res.status(200).send({ message: 'Falta enviar la imagen' });
    }
}

function getImageFile(req, res){
    let imageFile = req.params.imageFile;

    fs.exists('./uploads/'+imageFile, (exists) => {
        if (exists){
            res.sendFile(path.resolve('./uploads/'+imageFile));
        } else {
            return res.status(404).send({ message: 'No exsite la imagen' });
        }
    });
    
    
}

module.exports = {
    getImage,
    getImages,
    saveImage,
    updateImage,
    deleteImage,
    uploadImage,
    getImageFile
}