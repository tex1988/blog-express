const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../../blog-express-be/static'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),

  //Project folder
  projectDir: path.resolve(__dirname, '../../'),
}
