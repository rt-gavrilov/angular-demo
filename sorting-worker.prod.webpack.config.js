const path = require('path');

module.exports = {
  entry: './src/app/sortings/sorting.worker.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sorting-worker.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/}
    ]
  }
};
