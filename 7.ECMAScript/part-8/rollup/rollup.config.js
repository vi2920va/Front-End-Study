import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

module.exports = {
  input: './js/index.js',
  output: {
    file: './js/bundle.js',
    format: 'iife',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
