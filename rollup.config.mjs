import commonjs from 'rollup-plugin-commonjs';
import resolveAliases from 'rollup-plugin-resolve-aliases';
//import rxPaths from 'rxjs/_esm5/path-mapping';

const rollupGlobals = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/core/testing': 'ng.core.testing',

  'socket.io-client': 'node_modules/socket.io-client/dist/socket.io.js',

  'rxjs/Observable': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subject': 'Rx',

  'rxjs/observable/EmptyObservable': 'Rx.Observable',

  'rxjs/operators/catchError': 'Rx.operators',
  'rxjs/operators/map': 'Rx.operators',
};

export default {
  input: 'dist/index.js',
  context: 'this',
  output: {
    name: 'ng.SailsClient',
    globals: rollupGlobals,
    file: 'dist/bundles/ngx-sails.umd.js',
    format: 'umd',
  },
  sourceMap: false,
  plugins: [
    commonjs(),
    resolveAliases({
      aliases: {
        'socket.io-client': 'node_modules/socket.io-client/dist/socket.io.js',
      },
    }),
  ],
  external: Object.keys(rollupGlobals),
  resolve: {
    //alias: rxPaths(),
  },
};
