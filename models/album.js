'use strict'

let mongoose = require('mongoose');
let schema = mongoose.Schema;

let albumSchema = schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Album',albumSchema);