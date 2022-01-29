//Imports
const {join} = require('path');

//Export
module.exports = {
  entry: join(__dirname, 'entry.js'),
  mode: 'none',
  target: 'node',
  externals: [
    'child_process',
    'crypto',
    'events',
    'os',
    'path',
    'tty',
    'util',
    'worker_threads'
  ].map(key => ({key})),
  module: {
    rules: [
      {
        test: /worker\.js$/,
        loader: join(__dirname, '..', 'dist', 'cjs.js'),
        options: {
          target: 'node'
        }
      }
    ]
  },
  resolve: {
    mainFields: ['main', 'module']
  },
  output: {
    path: join(__dirname, 'dist')
  }
};