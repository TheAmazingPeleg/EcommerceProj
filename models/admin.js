const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
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

const createAdmin = async ({ username, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    return admin;
};
  
const getAdmin = async (username) => {
    const admin = await Admin.findOne({ username });
    return admin;
};
  
const getAdmins = async (options = {}) => {
    const admins = await Admin.find(options);
    return admins;
};
  
const updateAdmin = async (id, newAdmin) => {
    const admin = await Admin.findByIdAndUpdate(id, newAdmin, {
        new: true,
        runValidators: true,
    });
    return admin;
}
  
const deleteAdmin = async (id) => {
    const admin = await Admin.findByIdAndDelete(id);
    return admin;
}

module.exports = mongoose.model('Admin', Admin, "admins");
module.exports = {
    createAdmin,
    getAdmin,
    getAdmins,
    deleteAdmin,
    updateAdmin
};