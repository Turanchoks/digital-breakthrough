const app = require('./index');
const { port } = require('./config');

app.listen(port, () => {
  console.log(`Node.js server is listening at http://localhost:${port}/`);
  console.info(`server is started at port ${port}`);
});
