const bcrypt = require("bcryptjs");

const adminService = require("../services/admin");
const userService = require("../services/user");

const index = (req, res) => {
  res.render("../views/login.ejs");
};
const signup = (req, res) => {
    res.render("../views/register.ejs");
  };
const register = async (req, res) => {
    const { username, password, email, firstName, lastName } = req.body;
    if(username.length < 2){
        return res.status(404).json({ errors: ['The username must contain atleast 2 letters'] });
    }
    if(password.length < 6){
        return res.status(404).json({ errors: ['The password must contain atleast 6 letters'] });
    }
    if(email === ''){
        return res.status(404).json({ errors: ['Please use a vallid email!'] });
    }
    if(firstName.length < 2){
        return res.status(404).json({ errors: ['The first name must contain atleast 2 letters'] });
    }
    if(lastName.length < 2){
        return res.status(404).json({ errors: ['The last name must contain atleast 2 letters'] });
    }
    let userCheck = await userService.getUserByUsername(username);
    if(userCheck){
        return res.status(404).json({ errors: ['The username is used by another user'] });
    }
    userCheck = await userService.getUserByEmail(email);
    if(userCheck){
        return res.status(404).json({ errors: ['The email is used by another user'] });
    }
    userCreated = await userService.createUser(username, password, email, firstName, lastName);
    if(userCreated)
        return res.status(200).json({ message: ['Connected successfully']});
    return res.status(404).json({ errors: ['Unable to create a user!'] });
};

const login = async (req, res) => {
    const { username, password, path } = req.body;
    if(path.includes("/admin")){
        const admin = await adminService.getAdmin(username);
        
        if (!admin) {
            return res.status(404).json({ errors: ['Invalid username or password'] });
        }
        
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(404).json({ errors: ['Invalid username or password'] });
        }
        
        req.session.adminId = admin._id;
        
        return res.status(200).json({ message: ['Connected successfully']});
    }else{
        let user = await userService.getUserByUsername(username);
        if (!user) {
            user = await userService.getUserByEmail(username);
            if(!user)
                return res.status(404).json({ errors: ['Invalid username or password'] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ errors: ['Invalid username or password'] });
        }
        req.session.userId = user._id;

        return res.status(200).json({ message: ['Connected successfully']});
    }
};

module.exports = {
    index,
    signup,
    login,
    register
};