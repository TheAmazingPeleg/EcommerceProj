const requireAdminLogin = (pathToRedirect = '/admin') => (req, res, next) => {
    if (!req.session.adminId) {
        return res.redirect("/login?pathToRedirect=" + pathToRedirect);
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
    redirectIfAuthenticated,
};