const fs = require('fs');
const http = require('http');
const { json } = require('stream/consumers');
const url = require('url');

//#region FILES

const tempOverview = fs.readFileSync(
  './templates/template-overview.html',
  'utf-8'
);

const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');

const tempPost = fs.readFileSync('./templates/template-post.html', 'utf-8');

const tempSignIn = fs.readFileSync(
  './templates/template-sign-in.html',
  'utf-8'
);
const tempSignUp = fs.readFileSync(
  './templates/template-sign-up.html',
  'utf-8'
);

const postData = fs.readFileSync('./json-resources/post-data.json', 'utf-8');
const postObj = JSON.parse(postData);

//#endregion

//#region FUNCTION
const replaceTemplatePOSTTITLE = (temp, post) => {
  let output = temp
    .replace(/{%POSTTITLE%}/g, post.title)
    .replace(/{%POSTID%}/g, post._id.$oid);
  return output;
};

//#endregion

//#region SERVER
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

    const cardsHtml = postObj
      .map((el) => replaceTemplatePOSTTITLE(tempCard, el))
      .join('');

    //console.log(cardsHtml);

    const output = tempOverview.replace(/{%POST_CARD%}/g, cardsHtml);

    res.end(output);
  }

  //Post detail
  else if (path_name == '/post') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(tempPost);
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

  //Upload
  else if (path_name == '/upload') {
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
