const fs = require('fs');
const path = require('path');

const threads = JSON.parse(fs.readFileSync('./json-resources/threads.json'));
const threads_test = JSON.parse(fs.readFileSync('./json-resources/threads_test.json'));
const Thread = require('../models/mongo/Thread');
const driveAPI = require('../modules/driveAPI');
const helperAPI = require('../modules/helperAPI');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.CheckSlug = catchAsync(async (req, res, next, value) => {
  console.log('Slug value is: ' + value);
  const thread = await Thread.findOne({ slug: value });
  if (thread === undefined || !thread) {
    next(new AppError('No thread found with that slug', 404));
  }
  next();
});

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

exports.GetAllThreads = catchAsync(async (req, res) => {
  //console.log(threads_test);

  const threads = await Thread.find({});
  //console.log(threads);
  res.status(200).json({
    status: 'success',
    result: threads_test.length,
    requestTime: req.requestTime,
    data: {
      threads: threads,
    },
  });
});

exports.UploadNewFile = async (req, res) => {
  //console.log(req);
  const file = req.file;

  // console.log(file);
  const fileID = helperAPI.GenerrateRandomString(15);

  const fileExtension = path.extname(file.path);
  // console.log(fileExtension);

  const driveFileName = fileID + fileExtension;
  // console.log(driveFileName);

  const GoogleDriveAPIFolerID = '1vb2ZGYvrqsz7Rrw3WErV91YxxpeL3Sxh';

  const videoMetaData = {
    name: driveFileName,
    parents: [GoogleDriveAPIFolerID],
  };
  const videoMedia = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveAPIResponse = await driveAPI(videoMetaData, videoMedia);

  const driveID = driveAPIResponse.data.id;
  fs.unlink(file.path, function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });

  console.log(driveID);
  res.status(201).json({
    status: 'success upload',
    driveID: driveID,
  });
};

exports.GetThread = catchAsync(async (req, res) => {
  // console.log(req.params);

  const slug = req.params.slug;

  const thread = await Thread.findOne({ slug: slug });
  if (thread === undefined || !thread) {
    return next(new AppError('No thread found with that slug', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      thread: thread,
    },
  });
});

exports.CreateNewThread = catchAsync(async (req, res) => {
  console.log('api/v1/threads ');
  console.log(req.params);
  console.log(req.body);
  const newThreadMongo = new Thread(req.body);
  const response_data = await newThreadMongo
    .save()
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).json({
    status: 'success create',
    data: response_data,
  });
});

exports.CreateNewComment = catchAsync(async (req, res) => {
  console.log('api/v1/threads ');
  console.log(req.body);
  const { comment } = req.body;
  res.status(201).json({
    status: 'success comment!',
    data: comment,
  });
});

exports.UpdateThread = (req, res) => {
  console.log(req.params);
  const id = req.params.slug;
  const threadIndex = threads.findIndex((el) => el._id.$oid === id);

  threads[threadIndex] = req.body;
  console.log(threads);
  fs.writeFile('./json-resources/threads.json', JSON.stringify(threads), (err) => {
    res.status(200).json({
      status: 'success update',
      data: {
        updated_thread: threads[threadIndex],
      },
    });
  });
};

exports.DeleteThread = (req, res) => {
  console.log(req.params);
  const id = req.params.slug;
  const threadIndex = threads.findIndex((el) => el._id.$oid === id);

  res.status(204).json({
    status: 'success update',
    data: null,
  });
};
