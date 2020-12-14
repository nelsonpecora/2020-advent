const input = require('../utils/input');
const log = require('../utils/log');

function solveSlope (across, down, lines) {
  const length = lines[0].length;

  const total = lines.reduce((acc, line, index) => {
    if (index === 0) {
      return acc;
    }

    if (index % down !== 0) {
      return acc;
    }

    const x = acc.x;
    const newX = (x + across) % length;
    const char = line[newX];

    return {
      trees: char === '#' ? acc.trees + 1 : acc.trees,
      x: newX,
      y: acc.y + down
    };
  }, { trees: 0, x: 0, y: 0 });

  return total.trees;
}

module.exports = () => {
  const lines = input.lines('3');
  const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 }
  ];
  const total = slopes.reduce((acc, slope) => {
    return acc * solveSlope(slope.x, slope.y, lines);
  }, 1);

  log.succeed(total);
};
