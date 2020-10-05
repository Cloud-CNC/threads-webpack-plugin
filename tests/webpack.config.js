//Imports
const {resolve} = require('path');

//Export
module.exports = {
  entry: resolve('entry.js'),
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
        loader: '../',
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
    path: resolve('./dist')
  }
};