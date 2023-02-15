const Post = {
  title: { type: String, default: '' },
  link: { type: String, default: '' },
  content: { type: String, default: '' },
  user: { type: String, default: '' },
  slug: { type: String, default: '' },
  createdate: { type: Date, default: Date.now },
  points: { default: 0 },
};
