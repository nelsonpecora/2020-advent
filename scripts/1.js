const input = require('../utils/input');
const log = require('../utils/log');

function isSum (a, b, c, total) {
  return a + b + c === total;
}

module.exports = () => {
  const lines = input.lines('1');
  const numbers = lines.filter((line) => line.length).map((line) => parseInt(line));

  let found;

  numbers.find((a) => {
    return numbers.find((b) => {
      return numbers.find((c) => {
        if (isSum(a, b, c, 2020)) {
          found = a * b * c;
          return true;
        } else {
          return false;
        }
      });
    });
  });

  if (found) {
    log.succeed(found);
  } else {
    log.fail('not found');
  }
};
