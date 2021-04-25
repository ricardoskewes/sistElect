const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/image', (req, res) => {
  let json = {
    img: path.join(__dirname, '../public/img', '1.png'),
    partido: 'b'
  };
  let out = [];

  for (i = 0; i < parseInt(req.body.n); i++) {
    out.push(json);
  }

  res.json(out);
});

app.all('', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
});

// start node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App available at http://localhost:${port}`);
});

// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = app;
