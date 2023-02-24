const express = require('express');
const fs = require('fs');
const app = express();
const posts = JSON.parse(fs.readFileSync('./json-resources/posts.json'));
// const client_posts = JSON.parse(fs.readFileSync('./json-resources/client_posts.json'));

app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).send('Hello');
});

app.get('/api/v1/posts', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: posts.length,
    data: {
      posts: posts,
    },
  });
});

app.get('/api/v1/posts/:id/:n?', (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  const post = posts.find((el) => el._id.$oid === id);

  if (post === undefined || !post) {
    return res.status(401).json({
      status: 'failed',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      post: post,
    },
  });
});

app.post('/api/v1/post', (req, res) => {
  // console.log(req.body);

  var numberID = posts.length + 1;
  const newID = 'posts_' + numberID;
  // console.log(newID);
  const newPost = Object.assign({ _id: newID }, req.body);
  console.log(newPost);
  posts.push(newPost);
  fs.writeFile('./json-resources/posts.json', JSON.stringify(posts), (err) => {
    res.status(201).json({
      status: 'success create',
    });
  });
});

const port = 9000;
app.listen(port, () => {
  console.log('App listening to ' + port);
});
