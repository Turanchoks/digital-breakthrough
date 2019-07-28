const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
const keys = require('./config/keys');



const app = express();
const port = process.env.PORT || 9000;
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

app.listen(port, () => {
  console.log(`Node.js server is listening at http://localhost:${port}/`);
  console.info(`server is started at port ${port}`);
});

// https://flaviocopes.com/node-exceptions/
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
    console.error(err);
    process.exit(1); // mandatory (as per the Node docs)
})