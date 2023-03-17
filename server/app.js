'use strict';
const express = require('express');
const morgan = require('morgan');
const app = express();

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'falied',
  //   message: 'Cant find ' + req.originalUrl + ' on the server',
  // });

  const err = new Error('Cant find ' + req.originalUrl + ' on the server');
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

// const client_posts = JSON.parse(fs.readFileSync('./json-resources/client_posts.json'));

//MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
}
console.log(process.env.NODE_ENV);
app.use(express.json());
app.use(express.static('./public'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

//ROUTES
const threadRouter = require('./routes/threadRoute');
const userRouter = require('./routes/userRoute');
const signRouter = require('./routes/signRoute');
const testRoute = require('./routes/testRoute');

app.use('/', threadRouter);
app.use('/api/v1/threads', threadRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/sign', signRouter);
app.use('/api/test', testRoute);

module.exports = app;
