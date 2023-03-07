const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync('./json-resources/users.json'));
const helperAPI = require('../modules/helperAPI');
const driveAPI = require('../modules/driveAPI');
const threads_test = JSON.parse(fs.readFileSync('./json-resources/threads_test.json'));

exports.CheckID = (req, res, next, value) => {
  console.log('ID value is: ' + value);
  const user = users.find((el) => el._id.$oid === value);

  if (user === undefined || !user) {
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

exports.UploadNewFile = (req, res) => {
  const file = req.file;

  console.log(file);
  const fileID = helperAPI.GenerrateRandomString(15);

  const fileExtension = path.extname(file.path);
  console.log(fileExtension);

  const driveFileName = fileID + fileExtension;
  console.log(driveFileName);

  const GoogleDriveAPIFolerID = '1vb2ZGYvrqsz7Rrw3WErV91YxxpeL3Sxh';

  const videoMetaData = {
    name: driveFileName,
    parents: [GoogleDriveAPIFolerID],
  };
  const videoMedia = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  driveAPI(videoMetaData, videoMedia).then((full_data) => {
    console.log(full_data);

    fs.unlink(file.path, function (err) {
      if (err) throw err;
      console.log('File deleted!');
      res.end(full_data.data.id);
    });
  });
};

const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Thread required'] },
  content: { type: String, required: [true, 'Thread required'] },
  user: { type: String, default: 'Test User' },
  createDate: { type: Date, required: false },
  tag: { type: String, required: [true, 'Thread required'] },
  video: { type: String, required: [true, 'Thread required'] },
});
const Thread = mongoose.model('Thread', threadSchema);

exports.GetAllThreads = async (req, res) => {
  //console.log(threads_test);

  const threads = await Thread.find({});
  console.log(threads);
  res.status(200).json({
    status: 'success',
    result: threads_test.length,
    requestTime: req.requestTime,
    data: {
      threads: threads,
    },
  });
};

exports.CreateNewThread = (req, res) => {
  console.log('api/test/threads ');
  console.log(req.body);

  var numberID = threads_test.length + 1;
  const newID = 'threads_' + numberID;
  const newThread = Object.assign({ id: newID }, { user: 'Test user_1' }, req.body);
  console.log(newThread);
  threads_test.push(newThread);
  fs.writeFile('./json-resources/threads_test.json', JSON.stringify(threads_test), (err) => {
    res.status(201).json({
      status: 'success create',
    });
  });
};
