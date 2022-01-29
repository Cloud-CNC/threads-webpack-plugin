/**
 * @fileoverview Rollup Build Config
 */

//Imports
import typescript from 'rollup-plugin-typescript2';

//Export
export default {
  external: [
    'fs',
    'loader-utils',
    'path',
    'tmp',
    'webpack'
  ],
  input: 'src/index.ts',
  plugins: [
    typescript()
  ],
  output: [
    {
      exports: 'default',
      file: 'dist/cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/es.js',
      format: 'es'
    }
  ]
};