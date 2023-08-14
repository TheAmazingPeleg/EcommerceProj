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
});

module.exports = mongoose.model('Admin', Admin, "admins");