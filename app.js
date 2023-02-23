const express = require('express');
const fs = require('fs');
const app = express();
const posts = JSON.parse(fs.readFileSync('./json-resources/posts.json'));
const client_posts = JSON.parse(fs.readFileSync('./json-resources/client_posts.json'));

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

app.post('/api/v1/post', (req, res) => {
  // console.log(req.body);

  var numberID = client_posts.length + 1;
  const newID = 'posts_' + numberID;
  // console.log(newID);
  const newPost = Object.assign({ _id: newID }, req.body);
  console.log(newPost);
  client_posts.push(newPost);
  fs.writeFile('./json-resources/client_posts.json', JSON.stringify(client_posts), (err) => {
    res.status(201).json({
      status: 'success create',
    });
  });
});

const port = 9000;
app.listen(port, () => {
  console.log('App listening to ' + port);
});
