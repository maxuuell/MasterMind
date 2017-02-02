const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/src/index.js'),

  output: {
    path: path.join(__dirname, '/client/dist/'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel',
      query: {
        presets: ["react", "es2015"]
      }
    }],
  },

  watch: true
};
