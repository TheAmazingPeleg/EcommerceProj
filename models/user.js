const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        isRequired: true
    },
    password: {
        type: String,
        isRequired: true
    },
    email: {
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
        isRequired: false
    },
    country: {
        type: String,
        isRequired: false
    },
    city: {
        type: String,
        isRequired: false
    },
    zip: {
        type: String,
        isRequired: false
    }
});

module.exports = mongoose.model('User', User, "users");