const _ = require('lodash');
const input = require('../utils/input');
const log = require('../utils/log');

const totalRows = 127;
const totalCols = 7;

function binarySearch (val, total) {
  const path = val.split('');

  const [low, high] = path.reduce((acc, char) => {
    const [currLow, currHigh] = acc;

    if (['F', 'L'].includes(char)) {
      // take lower half
      return [currLow, currLow + Math.floor((currHigh - currLow) / 2)];
    } else {
      // take upper half
      return [currLow + Math.ceil((currHigh - currLow) / 2), currHigh];
    }
  }, [0, total]);

  if (low === high) {
    return low;
  }
}

module.exports = () => {
  const lines = input.lines('5');
  const seatIds = lines.reduce((acc, line) => {
    if (line === '') {
      return acc;
    }

    const row = line.substr(0, 7);
    const col = line.substr(7);
    const id = binarySearch(row, totalRows) * 8 + binarySearch(col, totalCols);

    return [...acc, id];
  }, []);

  const allSeatIds = _.range(0, totalRows + 1).reduce((acc, row) => {
    return [
      ...acc,
      ..._.range(0, totalCols + 1).reduce((colAcc, col) => {
        return [
          ...colAcc,
          row * 8 + col
        ];
      }, [])
    ];
  }, []);

  const missingSeats = allSeatIds.filter((id) => !seatIds.includes(id));
  const mySeat = missingSeats.find((id) => {
    return seatIds.includes(id + 1) && seatIds.includes(id - 1);
  });

  // const highestId = seatIds.reduce((acc, id) => Math.max(acc, id), 0);

  log.succeed(mySeat);
};
