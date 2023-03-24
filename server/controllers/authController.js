const jwt = require('jsonwebtoken');

const User = require('./../models/mongo/User');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const SignToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.SignUp = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const { account, password, passwordConfirm, email, username } = req.body;

  if (!account || !password || !passwordConfirm || !email || !username) {
    next(new AppError('Please provide full information for sign up.', 400));
  }

  const newUser = await User.create({
    account: account,
    password: password,
    passwordConfirm: passwordConfirm,
    email: email,
    username: username,
  });

  const token = SignToken(newUser._id);
  res.status(201).json({
    status: 'success create new user',
    token: token,
    data: {
      user: newUser,
    },
  });
});
exports.SignIn = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const { account, password } = req.body;
  if (!account || !password) {
    return next(new AppError('Please provide account and password.', 400));
  }
  const user = await User.findOne({ account: account }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Wrong information.', 401));
  }

  const token = SignToken(user._id);
  res.status(200).json({
    status: 'success sign in',
    token: token,
  });
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
exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check if it's there

  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);

  if (!token) {
    next(new AppError('You are not login'));
  }
  //2) Validate token

  //3) Check if user is existed

  //4) Check if user change password after JWT was issued

  next();
});

exports.Forget = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { account } = req.body;
  if (!account) {
    return next(new AppError('Please provide account to reset password', 400));
  }
  const user = await User.findOne({ account: account });

  if (!user) {
    return next(new AppError('Check input, no user', 401));
  }

  const token = SignToken(user._id);
  res.status(200).json({
    status: 'succeed ',
    message: 'Recover mail sent!',
  });
});
