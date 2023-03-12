const User = require('./../models/mongo/User');
const catchAsync = require('./../utils/catchAsync');

exports.SignUp = catchAsync(async (req, res, nex) => {
  console.log(req.body);
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success create new user',
    data: {
      user: newUser,
    },
  });
});
exports.SignIn = catchAsync(async (req, res, nex) => {
  console.log(req.body);
  const user = await User.findOne({ account: req.body.account, password: req.body.password });
  if (user === null) {
    res.status(400).json({
      status: 'failed',
      message: 'Wrong information',
    });
  } else {
    res.status(201).json({
      status: 'found user',
      data: {
        user: user,
      },
    });
  }
});
exports.SignOut = catchAsync(async () => {
  console.log(req.body);
  res.status(201).json({
    status: 'User sign out!',
    data: {
      user: req.body,
    },
  });
});
