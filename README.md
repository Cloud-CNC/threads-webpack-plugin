# ThreadsJS Webpack integration
[![npm](https://img.shields.io/npm/v/threads-webpack-plugin)](https://npmjs.com/package/threads-webpack-plugin)
[![tests](https://img.shields.io/github/workflow/status/Cloud-CNC/threads-webpack-plugin/Tests?label=tests)](https://github.com/Cloud-CNC/threads-webpack-plugin/actions)
[![last commit](https://img.shields.io/github/last-commit/Cloud-CNC/threads-webpack-plugin)](https://github.com/Cloud-CNC/threads-webpack-plugin/commits/master)

[ThreadsJS](https://threads.js.org) integration for [Webpack](https://webpack.js.org)

# Features
* Written in modern TypeScript
* Uses Webpack for TS compilation
* Thoroughly commented

# Usage
## Entry
```Javascript
//Imports
import {BlobWorker, spawn, Thread} from 'threads';
import WorkerText from './worker'; //May have to @ts-ignore if using TypeScript

//Create a **BLOB WORKER**
const worker = await spawn(BlobWorker.from(WorkerText));

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
//Imports
import resolve from '@webpack/plugin-node-resolve';
import threads from 'threads-webpack-plugin';

//Export
export default {
  //Point at your normal file (The plugin will take care of loading the worker)
  input: 'src/index.js',
  plugins: [
    resolve(),
    threads({
      //Exclude files
      exclude: ['**/exclude-me/worker.js'],

      //Include files
      include: ['**/worker.js'],

      //Webpack external configuration (Marks as external, helpful for Node runtimes)
      external: ['events'],

      //Child bundler plugins (Not reused; must be redefined if you want the same plugins)
      plugins: [
        resolve()
      ]
    })
  ]
};
```