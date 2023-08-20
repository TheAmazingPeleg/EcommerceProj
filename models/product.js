const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    priceBeforeDiscout: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    sizes: {
        type: Array,
        default: ['S', 'M', 'L']
    },
    colors: {
        type: Array,
        default: ['000000', 'FFFFFF', '6E260E']
    },
    sex: {
        type: Array,
        default: ['Unisex']
    }
});

module.exports = mongoose.model('Product', Product, 'products');