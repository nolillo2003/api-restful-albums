'use strict'

let mongoose = require('mongoose');
let schema = mongoose.Schema;

let imageSchema = schema({
    title: String,
    picture: String,
    // Así relacionamos esta imagen con el documento Album
    album: { type: schema.ObjectId, ref: 'Album' }
});

module.exports = mongoose.model('Image',imageSchema);