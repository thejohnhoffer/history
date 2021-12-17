import { babel } from '@rollup/plugin-babel';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import copy from 'rollup-plugin-copy';
import prettier from 'rollup-plugin-prettier';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const PRETTY = !!process.env.PRETTY;
const SOURCE_DIR = 'packages/use-hash-history';
const OUTPUT_DIR = 'build/use-hash-history';

const modules = [
  {
    input: `${SOURCE_DIR}/index.ts`,
    output: {
      file: `${OUTPUT_DIR}/index.js`,
      format: 'esm',
      sourcemap: !PRETTY
    },
    external: ['@babel/runtime/helpers/esm/extends'],
    plugins: [
      typescript({
        tsconfigDefaults: {
          compilerOptions: {
            declaration: true
          }
        }
      }),
      babel({
        exclude: /node_modules/,
        extensions: ['.ts'],
        presets: [['@babel/preset-env', { loose: true }]],
        plugins: [
          'babel-plugin-dev-expression',
          ['@babel/plugin-transform-runtime', { useESModules: true }]
        ],
        babelHelpers: 'runtime'
      }),
      compiler(),
      copy({
        targets: [
          { src: '${SOURCE_DIR}/README.md', dest: OUTPUT_DIR },
          { src: '${SOURCE_DIR}/LICENSE', dest: OUTPUT_DIR },
          { src: `${SOURCE_DIR}/package.json`, dest: OUTPUT_DIR }
        ],
        verbose: true
      })
    ].concat(PRETTY ? prettier({ parser: 'babel' }) : [])
  },
  ...['hash'].map((env) => {
    return {
      input: `${SOURCE_DIR}/${env}.ts`,
      output: {
        file: `${OUTPUT_DIR}/${env}.js`,
        format: 'esm',
        sourcemap: !PRETTY
      },
      plugins: [
        typescript({
          tsconfigDefaults: {
            compilerOptions: {
              declaration: true
            }
          }
        }),
        babel({
          exclude: /node_modules/,
          extensions: ['.ts'],
          presets: [['@babel/preset-env', { loose: true }]],
          plugins: ['babel-plugin-dev-expression'],
          babelHelpers: 'bundled'
        }),
        compiler()
      ].concat(PRETTY ? prettier({ parser: 'babel' }) : [])
    };
  })
];

const webModules = [
  {
    input: `${SOURCE_DIR}/index.ts`,
    output: {
      file: `${OUTPUT_DIR}/use-hash-history.development.js`,
      format: 'esm',
      sourcemap: !PRETTY
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            target: 'es2016'
          }
        }
      }),
      babel({
        exclude: /node_modules/,
        extensions: ['.ts'],
        presets: ['@babel/preset-modules'],
        plugins: ['babel-plugin-dev-expression'],
        babelHelpers: 'bundled'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: false
      }),
      compiler()
    ].concat(PRETTY ? prettier({ parser: 'babel' }) : [])
  },
  {
    input: `${SOURCE_DIR}/index.ts`,
    output: {
      file: `${OUTPUT_DIR}/use-hash-history.production.min.js`,
      format: 'esm',
      sourcemap: !PRETTY
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            target: 'es2016'
          }
        }
      }),
      babel({
        exclude: /node_modules/,
        extensions: ['.ts'],
        presets: ['@babel/preset-modules'],
        plugins: ['babel-plugin-dev-expression'],
        babelHelpers: 'bundled'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: false
      }),
      compiler(),
      terser({ ecma: 8, safari10: true })
    ].concat(PRETTY ? prettier({ parser: 'babel' }) : [])
  }
];

const globals = [
  {
    input: `${SOURCE_DIR}/index.ts`,
    output: {
      file: `${OUTPUT_DIR}/umd/use-hash-history.development.js`,
      format: 'umd',
      sourcemap: !PRETTY,
      name: 'HistoryLibrary'
    },
    plugins: [
      typescript(),
      babel({
        exclude: /node_modules/,
        extensions: ['.ts'],
        presets: [['@babel/preset-env', { loose: true }]],
        plugins: ['babel-plugin-dev-expression'],
        babelHelpers: 'bundled'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: false
      }),
      compiler()
    ].concat(PRETTY ? prettier({ parser: 'babel' }) : [])
  },
  {
    input: `${SOURCE_DIR}/index.ts`,
    output: {
      file: `${OUTPUT_DIR}/umd/use-hash-history.production.min.js`,
      format: 'umd',
      sourcemap: !PRETTY,
      name: 'HistoryLibrary'
    },
    plugins: [
      typescript(),
      babel({
        exclude: /node_modules/,
        extensions: ['.ts'],
        presets: [['@babel/preset-env', { loose: true }]],
        plugins: ['babel-plugin-dev-expression'],
        babelHelpers: 'bundled'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: false
      }),
      compiler(),
      terser()
    ].concat(PRETTY ? prettier({ parser: 'babel' }) : [])
  }
];

const node = [
  {
    input: `${SOURCE_DIR}/node-main.js`,
    output: {
      file: `${OUTPUT_DIR}/main.js`,
      format: 'cjs'
    },
    plugins: [compiler()].concat(PRETTY ? prettier({ parser: 'babel' }) : [])
  }
];

const config = [...modules, ...webModules, ...globals, ...node];

export default config;
