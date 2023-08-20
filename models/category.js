const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name : {
        type: String,
        required: true
    },
    slogan: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Category', Category, 'categories');