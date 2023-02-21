const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello!');
});

const port = 9000;
app.listen(port, () => {
  console.log('App listening to ' + port);
});
