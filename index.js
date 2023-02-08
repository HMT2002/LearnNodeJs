const fs = require('fs');
const http = require('http');
const { json } = require('stream/consumers');
const url = require('url');
const path = require('path');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
const replaceVideoTemp = require('./modules/replaceVideo');
const driveAPI = require('./modules//driveAPI');
const upload = require('./modules/multerAPI');

//#region FILES

const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');

const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');

const tempPost = fs.readFileSync('./templates/template-post.html', 'utf-8');
const tempVideo = fs.readFileSync('./templates/template-video.html', 'utf-8');
const tempUpdateButton = fs.readFileSync('./templates/template-update-button.html', 'utf-8');

const tempSignIn = fs.readFileSync('./templates/template-sign-in.html', 'utf-8');
const tempSignUp = fs.readFileSync('./templates/template-sign-up.html', 'utf-8');

const postData = fs.readFileSync('./json-resources/post-data.json', 'utf-8');
const postObj = JSON.parse(postData);
const multer = require('multer');

//#endregion

//#region FUNCTION

//#endregion

//#region SERVER

const slugs = postObj.map((el) => {
  return slugify(el._id.$oid, { lower: true });
});
console.log(slugs);

const server = http.createServer((req, res) => {
  console.log(url.parse(req.url, true));

  const { query, pathname } = url.parse(req.url, true);

  const path_name = pathname;

  console.log(path_name);
  console.log(query);

  //Overview page
  if (path_name === '/' || path_name === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHtml = postObj.map((el) => replaceTemplate(tempCard, el)).join('');
    //console.log(cardsHtml);
    const output = tempOverview.replace(/{%POST_CARD%}/g, cardsHtml);
    res.end(output);
  }

  //Post detail
  else if (path_name == '/post') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const post = postObj.find((e) => e._id.$oid === query.id);
    const video = replaceVideoTemp(tempVideo, post);
    const update_button = replaceTemplate(tempUpdateButton, post);
    const output = replaceTemplate(tempPost, post)
      .replace(/{%VIDEO%}/g, video)
      .replace(/{%UPDATEPOST_BUTTON%}/g, update_button);

    res.end(output);
  }

  //API
  else if (path_name == '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(quiz_data);
  }

  //Sign up
  else if (path_name == '/sign-up') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    res.end(tempSignUp);
  }

  //Sign in
  else if (path_name == '/sign-in') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(tempSignIn);
  }

  //Sign out
  else if (path_name == '/sign-out') {
  }

  //Create post
  else if (path_name == '/create-post') {
    //vì không phải ai vào web cũng tạo post được (chỉ có người tại nội dung mới đăng), nên phải
    const tempCreatePost = fs.readFileSync('./templates/template-create-post.html', 'utf-8');
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const post = postObj.find((e) => e._id.$oid === query.id);
    res.end(tempCreatePost);
  } else if (path_name == '/post-store') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const post = postObj.find((e) => e._id.$oid === query.id);
    res.end('The post has been stored');
  }
  //Update post
  else if (path_name == '/update-post') {
    const tempUpedatePost = fs.readFileSync('./templates/template-update-post.html', 'utf-8');
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const post = postObj.find((e) => e._id.$oid === query.id);
    res.end(tempUpedatePost);
  }

  //Upload
  else if (path_name == '/upload') {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.writeHead(404, {
          'Content-type': 'text/html',
        });
        console.log(err);
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err);
      }
      // Everything went fine.
      res.writeHead(200, {
        'Content-type': 'text/html',
      });
      console.log(req.file);
      const file = req.file;
      const GoogleDriveAPIFolerID = '1vb2ZGYvrqsz7Rrw3WErV91YxxpeL3Sxh';

      //upload file to drive
      const videoMetaData = {
        name: file.originalname,
        parents: [GoogleDriveAPIFolerID],
      };
      const videoMedia = {
        mimeType: 'video/mp4',
        body: fs.createReadStream(file.path),
      };

      driveAPI(videoMetaData, videoMedia).then((full_data) => {
        console.log('Dat la data then o index1: ', full_data.data.id);
        try {
          fs.unlinkSync(file.path);
          console.log('File removed:', file.path);
        } catch (err) {
          console.log('Cant remove: ' + err);
        }
      });

      // if (req.file.fullPath) {
      //   var fullPath = req.file.fullPath;
      //   var startIndex = fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/');
      //   var filename = fullPath.substring(startIndex);
      //   if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
      //     filename = filename.substring(1);
      //   }
      //   console.log(filename);
      // }

      const cardsHtml = postObj.map((el) => replaceTemplate(tempCard, el)).join('');
      //console.log(cardsHtml);
      const output = tempOverview.replace(/{%POST_CARD%}/g, cardsHtml);
      res.end(output);
    });
  }

  //Not found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'My-own-setup-header': 'Custom header',
    });
    res.end('This is ERROR request url, not handled');
  }
});

server.listen(9000, '127.0.0.1', () => {
  console.log('Listening to request on 9000');
});

//#endregion

/*
const hello = 'Hello world';
console.log(hello);

const textinput = fs.readFileSync('text.txt', 'utf-8');

console.log(textinput);

console.log(`This is the text: ${textinput}`);

fs.writeFileSync('out.txt', `This is the write out ${textinput} \nThat is it.`);

console.log('File written');
*/
