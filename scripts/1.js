const input = require('../utils/input');
const log = require('../utils/log');

function isSum (a, b, total) {
  return a + b === total;
}

module.exports = () => {
  const lines = input.lines('1');
  const numbers = lines.filter((line) => line.length).map((line) => parseInt(line));

  let found;

  numbers.find((a) => {
    return numbers.find((b) => {
      if (isSum(a, b, 2020)) {
        found = a * b;
        return true;
      } else {
        return false;
      }
    });
  });

  if (found) {
    log.succeed(found);
  } else {
    log.fail('not found');
  }
};
