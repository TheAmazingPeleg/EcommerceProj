const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    username: {
        type: String,
        isRequired: true
    },
    password: {
        type: String,
        isRequired: true
    },
    image: {
        type: String,
        isRequired: false
    }
});

module.exports = mongoose.model('Admin', Admin, "admins");