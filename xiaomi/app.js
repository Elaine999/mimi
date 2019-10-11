var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session')
const favicon = require('serve-favicon')//网页小图标

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')
var regRouter = require('./routes/reg');
var searchRouter = require('./routes/search');
var comRouter = require('./routes/com');
var carRouter = require('./routes/car');
var allRouter = require('./routes/all');
var PersonalDetailRouter=require('./routes/PersonalDetail');
var personalCenterRouter=require('./routes/personalCenter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon(path.join(__dirname, 'public/ico/favicon.ico')));//网页小图标
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(expressSession({
  name:'login',
  secret:'1234',
  cookie:{maxAge:604800000}
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/reg',regRouter);
app.use('/search_result',searchRouter);
app.use('/com',comRouter)
app.use('/car',carRouter);
app.use('/all',allRouter);
app.use('/PersonalDetail',PersonalDetailRouter);
app.use('/personalCenter',personalCenterRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;