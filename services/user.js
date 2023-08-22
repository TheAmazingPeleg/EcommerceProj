const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getUserByUsername = async (username) => {
    let user = await User.findOne({ username: username });
    return user;
};

const getUserByEmail = async (username) => {
    let user = await User.findOne({ username: username });
    return user;
};

const getUserById = async (id) => {
    const user = await User.findOne({ _id: id });
    return user;
};

const createUser = async (username, password, email, firstName, lastName) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username: username, password: hashedPassword, email: email, firstName: firstName, lastName: lastName });
    await user.save();
    return user;
};
  
const getUsers = async (options = {}) => {
    const users = await User.find(options);
    return users;
};
  
const updateUser = async (id, newUser) => {
    const user = await User.findByIdAndUpdate(id, newUser, {
        new: true,
        runValidators: true,
    });
    return user;
}
  
const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    return user;
}

module.exports = {
    getUserByUsername,
    getUserByEmail,
    getUserById,
    createUser,
    getUsers,
    updateUser,
    deleteUser
};