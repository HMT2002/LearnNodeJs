const express = require('express');
const fs = require('fs');
const app = express();
const posts = JSON.parse(fs.readFileSync('./json-resources/posts.json'));
// const client_posts = JSON.parse(fs.readFileSync('./json-resources/client_posts.json'));

app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).send('Hello');
});

const GetAllPost = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: posts.length,
    data: {
      posts: posts,
    },
  });
};

const GetPost = (req, res) => {
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
};

const CreateNewPost = (req, res) => {
  console.log(req.params);

  var numberID = posts.length + 1;
  const newID = 'posts_' + numberID;
  const newPost = Object.assign({ _id: newID }, req.body);
  console.log(newPost);
  posts.push(newPost);
  fs.writeFile('./json-resources/posts.json', JSON.stringify(posts), (err) => {
    res.status(201).json({
      status: 'success create',
    });
  });
};

const UpdatePost = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const postIndex = posts.findIndex((el) => el._id.$oid === id);

  if (postIndex === undefined || !postIndex) {
    return res.status(401).json({
      status: 'failed',
      message: 'invalid ID',
    });
  }
  posts[postIndex] = req.body;
  console.log(posts);
  fs.writeFile('./json-resources/posts.json', JSON.stringify(posts), (err) => {
    res.status(200).json({
      status: 'success update',
      data: {
        updated_post: posts[postIndex],
      },
    });
  });
};

const DeletePost = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const postIndex = posts.findIndex((el) => el._id.$oid === id);
  if (postIndex === undefined || !postIndex) {
    return res.status(401).json({
      status: 'failed',
      message: 'invalid ID',
    });
  }
  res.status(204).json({
    status: 'success update',
    data: null,
  });
};

// app.get('/api/v1/posts', GetAllPost);

// app.get('/api/v1/posts/:id/:n?', GetPost);

// app.post('/api/v1/posts', CreateNewPost);

// app.patch('/api/v1/posts/:id', UpdatePost);

// app.delete('/api/v1/posts/:id', DeletePost);

app.route('/api/v1/posts').get(GetAllPost).post(CreateNewPost);
app.route('/api/v1/posts/:id/:n?').get(GetPost).patch(UpdatePost).delete(DeletePost);

const port = 9000;
app.listen(port, () => {
  console.log('App listening to ' + port);
});
