const path = require('path');
const ejs = require('ejs-promise');

module.exports = async ({ template, params }) => {
  // Get the EJS file that will be used to generate the HTML
  const file = path.join(__dirname, `./templates/${template}.ejs`);

  // Throw an error if the file path can't be found
  if (!file) {
    throw new Error(`Could not find the ${template} in path ${file}`);
  }

  return await ejs.renderFile(file, params, {}, (error, result) => {
    if (error) {
      return error;
    }
    return result
      .then(function(data) {
        return data;
      })
      .catch(error => {
        throw error;
      });
  });
};

// module.exports.HTMLGenerator = HTMLGenerator;
