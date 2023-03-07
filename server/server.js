const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const mongoose = require('mongoose');

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// mongoose.connect(DB, {}).then((con) => {
//   console.log('Mongo connected! ');
//   //console.log(con.connections);
// });

// const postSchema = new mongoose.Schema({
//   title: { type: String, required: [true, 'Post required'] },
//   content: { type: String, required: [true, 'Post required'] },
//   user: { type: String, default: 'Test User' },
//   createDate: { type: Date, required: false },
//   tag: { type: String, required: [true, 'Post required'] },
//   video: { type: String, required: [true, 'Post required'] },
// });
// const Post = mongoose.model('Post', postSchema);

// const newPost = new Post({
//   user: 'Test user_1',
//   content: 'test content render',
//   createDate: Date.now(),
//   title: 'test title render',
//   tag: 'a',
//   video: 'a',
// });

// newPost
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const dbVideoSharing = require('./config/database/db_index');

dbVideoSharing.connect();

//console.log(process.env);
//START SERVER
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log('App listening to ' + port);
});
