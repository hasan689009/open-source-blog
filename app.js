//Import&package load
require('dotenv').config();
const { strict } = require('assert');
const path = require('path');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');// authorization
const LocalStrategy = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override')
// router load
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const fileUpload = require('express-fileupload');

// controller load
const authController = require('./controllers/authController');

//app init
const app = express();


app.use(require('body-parser').urlencoded({ extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(methodOverride('_method'));
app.use(fileUpload());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookie: { maxAge: 60 * 60 * 1000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://root:root@localhost:27017/blog?authMechanism=DEFAULT&authSource=admin' })
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.errors = req.flash("error");
    res.locals.successes = req.flash("success");
    next();
});


//authentication

// app.use(session({secret: 'whatever can input', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(authController.strategy));
passport.serializeUser(authController.serializeUser);
passport.deserializeUser(authController.deserializeUser);

// Route Setup
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/admin', authController.authorize() ,adminRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// Error Handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
