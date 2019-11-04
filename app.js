var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dormQueryRouter = require('./routes/dormQuery');
var roomMateQueryRouter = require('./routes/roomMateQuery');
var loginRouter = require('./routes/login');
var insertVisitor = require('./routes/insertVisitor');
var checkInManager = require('./routes/manager/checkInManager');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dormQuery',dormQueryRouter);
app.use('/roomMateQuery',roomMateQueryRouter);
app.use('/login',loginRouter);
app.use('/insertVisitor',insertVisitor);
app.use('/checkInManager', checkInManager);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
