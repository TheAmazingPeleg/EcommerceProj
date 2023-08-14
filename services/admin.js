const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

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
const initFirstAdmin = async() => {
    const adminsList = await getAdmins();
    if(adminsList.length === 0){
        const admin = createAdmin({ username: "admin", password: "123" });
    }
}
initFirstAdmin();

module.exports = {
    createAdmin,
    getAdmin,
    getAdmins,
    deleteAdmin,
    updateAdmin,
    initFirstAdmin
};