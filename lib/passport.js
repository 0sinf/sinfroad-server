const config = require('../config/admin');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(id, done) {
    done(null, id);
  });
  
  passport.use(new LocalStrategy(
    function(username, password, done) {
      if (username !== config.username) {
        return done(null, false, {message: 'Incorrect Username.'});
      }
      if (password !== config.password) {
        return done(null, false, {message: 'Incorrect Password.'});
      }
      return done(null, username);
    }
  ));

  return passport;

}