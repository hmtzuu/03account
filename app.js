var createError = require('http-errors'); //createError為一函式
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');//錯誤輸出日誌

var indexRouter = require('./routes/web/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));  //開發環境設置
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//第一個參數'/'代表indexRouter內之路由規則不加前綴

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));   //繼續下一個多餘的回調
});

app.use(function(err,req, res, next) { //此回調純為多餘//只是為了測試
  console.log('test~~~~~~~~~~')
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message+' zzzzz';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); //在error模版內可以存取res.locals屬性定義的變量s
});

module.exports = app;
