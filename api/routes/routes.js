const User = require('../controllers/login');
const dashboard = require('../controllers/dashboard');
const signup = require('../controllers/signup');

module.exports = (app, passport) => {
// local routes ===============================================================

  app.post('/api/v1/login', User.login);
  app.post('/api/v1/signup', signup.saveUser);
  app.post('/api/v1/admin/signup', signup.saveUser);

  // authenticated route with jwt auth ===================================================
  app.get('/api/v1/user/:id/dashboard', passport.authenticate('jwt', { session: false }), dashboard.User);
  app.get('/api/v1/admin/:id/dashboard', passport.authenticate('jwt', { session: false }), dashboard.requireAdmin);
  // User routes ================================================
};
