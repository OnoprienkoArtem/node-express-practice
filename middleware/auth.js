module.exports = function(res, req, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect('/auth/login');
  }

  next();
}
