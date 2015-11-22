var passport = require('passport')

module.exports = function(app) {


  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done){
      done(null, user)
  });

  passport.deserializeUser(function(user, done){
      done(null, user);
  });

  require('./strategies/google.strategies')();
  require('./strategies/twitter.strategies')();
  require('./strategies/facebook.strategies')();

};
