const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const keys = require('./config');

const app = express();
const client = new MongoClient(keys.mongoURI);

client.connect(function(err) {
  if (err) {
    console.error(err);
  }

  global.db = client.db('mongo');
  console.log('succesfully connected to mongodb');
});

app.use(cors());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/Mail.route')(app);

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
