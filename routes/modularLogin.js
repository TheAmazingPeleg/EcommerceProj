const requireAdminLogin = (pathToRedirect = '/admin') => (req, res, next) => {
    if (!req.session.adminId) {
        return res.redirect("/login?pathToRedirect=" + pathToRedirect);
    }
    next();
};

const requireUserLogin = () => (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    next();
};
  
const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.adminId) {
        return res.redirect("/admin");
    }
    if (req.session.userId) {
        return res.redirect("/");
    }
    next();
};
  
module.exports = {
    requireAdminLogin,
    requireUserLogin,
    redirectIfAuthenticated,
};