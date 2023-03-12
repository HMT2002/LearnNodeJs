module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log('Error: ' + err);
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    });
  };
};
