const path = require('path');
const execSync = require('child_process').execSync;

let configs = [
  path.resolve(__dirname, 'rollup/hash.config.js'),
  path.resolve(__dirname, 'rollup/history.config.js')
]

configs.forEach((config) => {
  execSync(`rollup -c ${config}`, {
    env: process.env,
    stdio: 'inherit'
  });
})
