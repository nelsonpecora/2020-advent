const chalk = require('chalk');

function succeed (message) {
  console.log(`${chalk.greenBright('✓')} ${message}`);
}

function fail (message) {
  console.log(`${chalk.redBright('✗')} ${message}`);
}

function info (message) {
  console.log(`${chalk.blue('→')} ${message}`);
}

module.exports.succeed = succeed;
module.exports.fail = fail;
module.exports.info = info;
