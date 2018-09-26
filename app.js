require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
require('express-async-errors');
const logger = require('morgan');
const mongoose = require('mongoose');
const dbConnectionString = `${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.connect(dbConnectionString);

if(!process.env.STORAGE_PATH) {
  throw new Error('STORAGE_PATH must be set');
}

const routes = require('./routes/index');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const errorMsg = req.app.get('env') === 'development' 
    ? err.message : 'An error was accured';

  res.status(err.status || 500).send(errorMsg)
});

module.exports = app;
