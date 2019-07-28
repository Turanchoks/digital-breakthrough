const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const loaddb = require('./utils/db');

const app = express();

loaddb();

app.use(cors());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/Mail.route')(app);

app.get('/api/test', (req, res) => {
  res.send('test');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

module.exports = app;

// https://flaviocopes.com/node-exceptions/
process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err);
  console.error(err);
  process.exit(1); // mandatory (as per the Node docs)
});
