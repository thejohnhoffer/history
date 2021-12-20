const execSync = require('child_process').execSync;

const uvu = "../../node_modules/uvu/bin.js";
const args = "-r tsm -r esm";
const dir = "__debug__";
console.log(`${uvu} ${args} ${dir}`);
execSync(`${uvu} ${args} ${dir}`, {
  env: process.env,
  stdio: 'inherit'
});
