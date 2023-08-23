const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    userId: {
        type: String,
        isRequired: true
    },
    firstName: {
        type: String,
        isRequired: true
    },
    lastName: {
        type: String,
        isRequired: true
    },
    address: {
        type: String,
        isRequired: true
    },
    country: {
        type: String,
        isRequired: true
    },
    city: {
        type: String,
        isRequired: true
    },
    zip: {
        type: String,
        isRequired: true
    },
    date: {
        type: Number,
        default: Date.now,
        isRequired: true
    },
    cart: {
        type: String,
        isRequired: true
    },
    deliveryDate: {
        type: Number,
        isRequired: false
    },
    status: {
        type: String,
        isRequired: true
    },
    cost: {
        type: Number,
        isRequired: true
    }
});
module.exports = mongoose.model('Order', Order, "orders");