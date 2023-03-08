const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Post required'] },
  content: { type: String, required: [true, 'Post required'] },
  user: { type: String, default: 'Test User' },
  createDate: { type: Date, required: false },
  tag: { type: String, required: [true, 'Post required'] },
  video: { type: String, required: [true, 'Post required'] },
});
const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
