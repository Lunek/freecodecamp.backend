var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(__dirname + '/public'));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.route('/name').get(nameHandler).post(nameHandler);

function nameHandler(req, res) {
  const dataSource = req.method === 'GET' ? req.query : req.body;
  const { first, last } = dataSource;
  res.send({ name: `${first} ${last}` });
};

app.get('/:word/echo', (req, res) => {
  res.send({ echo: req.params.word });
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({ time: req.time });
});

app.get('/', (req, res) => {
  const file = __dirname + '/views/index.html';
  res.sendFile(file);
});

app.get('/json', (req, res) => {
  let data = "Hello json";
  data = process.env.MESSAGE_STYLE === 'uppercase' ? data.toUpperCase() : data;
  res.json({
    "message": data
  });
});

module.exports = app;
