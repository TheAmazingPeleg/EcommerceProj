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
    next();
};
  
module.exports = {
    requireAdminLogin,
    redirectIfAuthenticated,
};