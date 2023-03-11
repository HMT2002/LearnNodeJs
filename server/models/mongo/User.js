const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Account required'], unique: true },
  password: { type: String, required: [true, 'Account required'] },
  passwordConfirm: { type: String, required: [true, 'Please confirm your password'] },
  account: { type: String, required: [true, 'Account required'], unique: true },
  email: { type: String, required: [true, 'Account required'], unique: true },
  cert_paper: { type: String, default: '', required: false },
  living_city: { type: String, default: '', required: false },
  cert_date: { type: String, default: '', required: false },
  createDate: { type: Date, required: false },

  role: { type: String, default: 'norm_user' },
  photo: {
    link: { type: String, default: 'https://i.imgur.com/KNJnIR0.jpg' },
  },
  points: { type: Number, default: 0 },
});
const User = mongoose.model('User', userSchema);

module.exports = User;
