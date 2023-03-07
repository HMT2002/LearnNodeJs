const fs = require('fs');
const threads = JSON.parse(fs.readFileSync('./json-resources/threads.json'));
const threads_test = JSON.parse(fs.readFileSync('./json-resources/threads_test.json'));

exports.CheckID = (req, res, next, value) => {
  console.log('ID value is: ' + value);
  const thread = threads.find((el) => el._id.$oid === value);

  if (thread === undefined || !thread) {
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

exports.GetAllThreads = (req, res) => {
  console.log(threads);

  res.status(200).json({
    status: 'success',
    result: threads.length,
    requestTime: req.requestTime,
    data: {
      threads: threads,
    },
  });
};

exports.GetThread = (req, res) => {
  console.log(req.params);

  const id = req.params.id;
  const thread = threads.find((el) => el._id.$oid === id);

  res.status(200).json({
    status: 'success',
    data: {
      thread: thread,
    },
  });
};

exports.CreateNewThread = (req, res) => {
  console.log(req.params);

  var numberID = threads.length + 1;
  const newID = 'threads_' + numberID;
  const newThread = Object.assign({ _id: newID }, req.body);
  console.log(newThread);
  threads.push(newThread);
  fs.writeFile('./json-resources/threads.json', JSON.stringify(threads), (err) => {
    res.status(201).json({
      status: 'success create',
    });
  });
};

exports.CreateNewThreadTest = (req, res) => {
  //console.log(req);
  console.log(req.params);
  console.log(req.body);

  var numberID = threads_test.length + 1;
  const newID = 'threads_' + numberID;
  const newThread = Object.assign({ _id: newID }, req.body);

  threads_test.push(newThread);
  fs.writeFile('./json-resources/threads_test.json', JSON.stringify(threads_test), (err) => {
    if (err) {
      res.status(400).json({
        status: 'failed',
        message: 'bad request ' + err,
      });
    }

    res.status(201).json({
      status: 'success create',
      new_thread: newThread,
    });
  });
};

exports.UpdateThread = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
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
  const id = req.params.id;
  const threadIndex = threads.findIndex((el) => el._id.$oid === id);

  res.status(204).json({
    status: 'success update',
    data: null,
  });
};
