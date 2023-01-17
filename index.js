const fs = require('fs');
const http = require('http');
const { json } = require('stream/consumers');
const url = require('url');

//#region FILES

const quiz_data = fs.readFileSync('./json-resources/data.json', 'utf-8');
const quiz_obj = JSON.parse(quiz_data);

//#endregion

//#region SERVER
const server = http.createServer((req, res) => {
  console.log(req.url);

  const path_name = req.url;

  if (path_name === '/' || path_name === '/overview') {
    res.end('This is the overview');
  } else if (path_name == '/product') {
    res.end('This is the product');
  } else if (path_name == '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(quiz_data);
  } else {
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
