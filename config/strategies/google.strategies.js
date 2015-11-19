var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = function(){
  passport.use(new GoogleStrategy({
          clientID: '822246465440-rbv8o8b5t465fupp0voesgfipapmdio1.apps.googleusercontent.com',
          clientSecret: '2dXAnFE6ZxBPjxhI1MdSRfeF',
          callbackURL: 'http://localhost:3000/auth/google/callback'},
          function(req, accessToken, refreshToken, profile, done){
              done(null, profile);
          }
  ));
};
