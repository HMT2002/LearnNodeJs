const jwt = require('jsonwebtoken');

const User = require('./../models/mongo/User');
const catchAsync = require('./../utils/catchAsync');

exports.SignUp = catchAsync(async (req, res, nex) => {
  console.log(req.body);

  const newUser = await User.create({
    account: req.body.account,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email,
    username: req.body.username,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.status(201).json({
    status: 'success create new user',
    token: token,
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
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(201).json({
      status: 'found user',
      token: token,

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
