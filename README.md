# ThreadsJS Webpack integration
[![npm](https://img.shields.io/npm/v/threads-webpack-plugin)](https://npmjs.com/package/threads-webpack-plugin)
[![tests](https://img.shields.io/github/workflow/status/Cloud-CNC/threads-webpack-plugin/CID?label=ci/cd)](https://github.com/Cloud-CNC/threads-webpack-plugin/actions)
[![last commit](https://img.shields.io/github/last-commit/Cloud-CNC/threads-webpack-plugin)](https://github.com/Cloud-CNC/threads-webpack-plugin/commits/master)

[ThreadsJS](https://threads.js.org) integration for [Webpack](https://webpack.js.org). If you're using Rollup, you may want to check out [rollup-plugin-threads](https://github.com/cloud-cnc/rollup-plugin-threads) (Basically does the same thing as this plugin but for Rollup).

# Features
* Written in modern TypeScript
* Uses Rollup for TS compilation
* Thoroughly commented

# Usage
## Entry
```Javascript
//Imports
import {BlobWorker, spawn, Thread} from 'threads';
import WorkerText from './worker'; //May have to @ts-ignore if using TypeScript

//Create a **BLOB WORKER**
const worker = await spawn(BlobWorker.fromText(WorkerText));

console.log(worker.echo('Hello World!')); //Worker received: Hello World!

//Destroy the worker
Thread.terminate(worker);
```

## Worker
```Javascript
//Imports
import {expose} from 'threads';

//Worker functions
const worker = {
  echo(input)
  {
    return `Worker received: ${input}`;
  }
};

//Expose worker
expose(worker);
```

## Webpack Config
```Javascript
//Export
module.exports = {
  //Point at your normal file (The plugin will take care of loading the worker)
  entry: 'src/index.js',
  module: {
    rules: [
      {
        test: /worker\.js$/,
        loader: 'threads-webpack-plugin',
        options: {
          //Webpack child bundler options
        }
      }
    ]
  }
};
```
