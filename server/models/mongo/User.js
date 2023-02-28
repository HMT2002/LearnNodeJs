const User = {
  name: { type: String, default: '' },
  pass: { type: String, default: '' },
  user: { type: String, default: '' },
  admin: { type: Boolean, default: false },
  avatar: {
    mimetype: { type: String, default: '' },
    link: { type: String, default: '' },
  },
  points: { default: 0 },
};
