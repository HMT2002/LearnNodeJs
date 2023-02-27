const express = require('express');
const app = express();
const morgan = require('morgan');
// const client_posts = JSON.parse(fs.readFileSync('./json-resources/client_posts.json'));

//MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
console.log(process.env.NODE_ENV);
app.use(express.json());
app.use(express.static('./public'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

//ROUTES
const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');

app.use('/', postRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
