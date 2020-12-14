const fs = require('fs');
const path = require('path');

function lines (num) {
  const filename = path.join(__dirname, '..', 'inputs', `${num}.txt`);
  const file = fs.readFileSync(filename, 'utf-8');

  return file.split(/\r?\n/);
}

module.exports.lines = lines;
