const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mfp = require('mfp');
const moment = require('moment');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {

  let date = moment().format('YYYY-MM-DD');
  let calories = (req.query.f * 9) + (req.query.p * 4) + 80;
  console.log(req.query);

  mfp.fetchSingleDate(req.query.u, date, 'all', function(data){

    res.render('index', { 
        data: data, 
        fat: req.query.f, 
        protein: req.query.p,
        calories: calories 
      }
    );

  });

});

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