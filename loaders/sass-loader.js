const sass = require('node-sass');

module.exports = (data, file) => {
  try {
    return sass.renderSync({data, file, includePaths: ['src/styles/']}).css.toString('utf8');
  } catch (e) {
    console.error(e);
  }
};
