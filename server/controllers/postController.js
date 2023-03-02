const fs = require('fs');
const posts = JSON.parse(fs.readFileSync('./json-resources/posts.json'));

exports.CheckID = (req, res, next, value) => {
  console.log('ID value is: ' + value);
  const post = posts.find((el) => el._id.$oid === value);

  if (post === undefined || !post) {
    return res.status(401).json({
      status: 'failed',
      message: 'invalid ID',
    });
  }
  next();
};

exports.CheckInput = (req, res, next, value) => {
  console.log('ID value is: ' + value);
  var isInvalid = false;

  if (!req.body) {
    isInvalid = true;
  }

  if (isInvalid) {
    return res.status(400).json({
      status: 'failed',
      message: 'bad request',
    });
  }
  next();
};

exports.GetAllPosts = (req, res) => {
  console.log(posts);

  res.status(200).json({
    status: 'success',
    result: posts.length,
    requestTime: req.requestTime,
    data: {
      posts: posts,
    },
  });
};

exports.GetPost = (req, res) => {
  console.log(req.params);

  const id = req.params.id;
  const post = posts.find((el) => el._id.$oid === id);

  res.status(200).json({
    status: 'success',
    data: {
      post: post,
    },
  });
};

exports.CreateNewPost = (req, res) => {
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

exports.UpdatePost = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const postIndex = posts.findIndex((el) => el._id.$oid === id);

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

exports.DeletePost = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const postIndex = posts.findIndex((el) => el._id.$oid === id);

  res.status(204).json({
    status: 'success update',
    data: null,
  });
};
