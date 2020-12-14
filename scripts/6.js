const _ = require('lodash');
const input = require('../utils/input');
const log = require('../utils/log');

module.exports = (isTest) => {
  const lines = input.lines('6', isTest);
  const groups = lines.reduce((acc, line) => {
    const currGroup = acc.arr[acc.index];

    if (line === '') {
      return {
        index: acc.index + 1,
        arr: [...acc.arr, []]
      };
    }

    if (_.isNull(currGroup)) {
      return acc;
    }

    const fields = line.split('');

    if (!currGroup.length) {
      acc.arr[acc.index] = fields;
    } else if (_.intersection(currGroup, fields).length) {
      acc.arr[acc.index] = _.intersection(currGroup, fields);
    } else {
      acc.arr[acc.index] = null;
    }

    return acc;
  }, { index: 0, arr: [[]] });

  const total = groups.arr.reduce((acc, group) => {
    return _.isNull(group) ? acc : acc + group.length;
  }, 0);

  log.succeed(total);
};
