const AppError = require('../utils/appError');

const handleJWTError = () => new AppError('You are not login', 401);

const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    // stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };

  // if (error.name === 'CastError') error = handleCastErrorDB(error);
  // if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleJWTError();
  console.log(error);
  sendError(error, res);
};
