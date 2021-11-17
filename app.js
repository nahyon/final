var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const database = require('./dbconnection'); //mysql connect //여기서 필요X (stock.js, store.js)
//npm i swagger-jsdoc swagger-ui-express --save-dev

const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


var indexRouter = require('./routes/index');
var storeRouter = require('./routes/store'); //store data in db 'daily' table
var stocksRouter = require('./routes/stocks'); //get stock data
var storedataRouter = require('./routes/storedata'); //store data in db each 'symbol' table
var chartRouter = require('./routes/chart'); //drawing chart
//const { swaggerUi, swaggerspecs } = require('./modules/swagger'); //swagger.js불러옴


var app = express();

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      title: 'Test API - stock',
      version: '1.0'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./api-doc/**/*.yaml']
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/store', storeRouter); //store data in db 'daily' table
app.use('/stocks', stocksRouter); //get stock data
app.use('/storedata', storedataRouter); //store data in db each 'symbol' table
app.use('/chart', chartRouter);  //drawing chart

//localhost:3000/swagger
//app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerspecs)); //swagger. path설정
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


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
