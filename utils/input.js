const fs = require('fs');
const path = require('path');

function lines (num, isTest) {
  const basename = isTest ? `${num}-test.txt` : `${num}.txt`;
  const filename = path.join(__dirname, '..', 'inputs', basename);
  const file = fs.readFileSync(filename, 'utf-8');

  return file.split(/\r?\n/);
}

module.exports.lines = lines;
