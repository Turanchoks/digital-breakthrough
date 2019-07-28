const proxy = require('http-proxy-middleware');
require('dotenv').config();

module.exports = function(app) {
  try {
    app.use(
      proxy('/api/hibp', {
        target: 'https://haveibeenpwned.com/api/v3/',
        // secure: false,
        headers: {
          'hibp-api-key': process.env.HIBP_API_KEY,
        },
      })
    );
  } catch (error) {
    console.log(error);
  }
};
