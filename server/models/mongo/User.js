const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Account required'], unique: true },
  password: { type: String, required: [true, 'Account required'] },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        // This only works on CREATE and SAVE!
        console.log(this);
        return el === this.password; // passwordConfirm===password
      },
      message: 'Password are not the same',
    },
  },
  account: { type: String, required: [true, 'Account required'], unique: true },
  email: { type: String, required: [true, 'Account required'], unique: true },
  cert_paper: { type: String, default: '', required: false },
  living_city: { type: String, default: '', required: false },
  cert_date: { type: String, default: '', required: false },

  role: { type: String, default: 'norm_user' },
  photo: {
    link: { type: String, default: 'https://i.imgur.com/KNJnIR0.jpg' },
  },
  points: { type: Number, default: 0 },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password actually modified
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
