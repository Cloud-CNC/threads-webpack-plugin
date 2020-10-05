/**
 * @fileoverview Threads-Webpack-Plugin: ThreadsJS Webpack integration
 */

//Imports
import {getOptions} from 'loader-utils';
import {basename, dirname} from 'path';
import {readFileSync, unlinkSync} from 'fs';
import {tmpNameSync} from 'tmp';
import webpack from 'webpack';

//Export
export default async function (this: webpack.loader.LoaderContext)
{
  //Generate temp file information
  const temp = tmpNameSync();

  //Get options
  const options = getOptions(this);

  //Define worker compiler
  const compiler = webpack({
    //Merge user-supplied options
    ...options,
    entry: this.resourcePath,
    output: {
      filename: basename(temp),
      path: dirname(temp)
    }
  });

  //Compile
  try
  {
    //Wrap with promise (Asyncify)
    await new Promise((resolve, reject) =>
    {
      //Compile file
      compiler.run((err, stats) =>
      {
        //Handle errors
        if (err != null)
        {
          reject(err);
        }
        else
        {
          resolve(stats);
        }
      });
    });
  }
  //Proxy errors
  catch (err)
  {
    this.emitError(err);
    return;
  }

  //Read file
  const code = readFileSync(temp, 'utf8');

  //Delete file
  unlinkSync(temp);

  //Format
  return `export default ${JSON.stringify(code)}`;
}