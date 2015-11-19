var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session')


var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth')

var app = express();
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.user(new GoogleStrategy({
    clientID: '91757471906-r2qk48k1vfmmikgqljorb267hcj1ll4n.apps.googleusercontent.com',
    clientSecret: '55zGa68NGuJjD8f7jrSk2XDi',
    callbackURL: 'http://localhost:3000/auth/google/callback'},
    function(req, acessToken, refreshToken, profile, done){
      done(null, profile);
    }
))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(function(user, done){
  done(null, user)
});

passport.deserializeUser(function(user, done){
  done(null, user);
});


app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth)

app.use(session({secret: 'p4a'}))
app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
