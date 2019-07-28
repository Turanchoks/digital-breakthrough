require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  mailgunPrivateApiKey: process.env.MAILGUN_KEY,
  hibp_api_key: process.env.HIBP_KEY,
  domain: process.env.DOMAIN,
  port: process.env.PORT,
};
