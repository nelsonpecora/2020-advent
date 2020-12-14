const input = require('../utils/input');
const log = require('../utils/log');

function isValid (low, high, char, pass) {
  const split = pass.split('');
  const isFirst = split[low - 1] === char;
  const isLast = split[high - 1] === char;

  return (isFirst && !isLast) || (isLast && !isFirst);
}

module.exports = () => {
  const lines = input.lines('2');
  const totalValid = lines.reduce((acc, line) => {
    const matches = line.match(/(\d+)-(\d+)\s([a-z]):\s([a-z]+)$/);

    if (!matches) {
      return acc;
    }

    const low = matches[1];
    const high = matches[2];
    const char = matches[3];
    const pass = matches[4];

    if (isValid(low, high, char, pass)) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  log.succeed(totalValid);
};
