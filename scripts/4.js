const input = require('../utils/input');
const log = require('../utils/log');

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
];

function yearBetween (val, low, high) {
  const year = parseInt(val);

  return year >= low && year <= high;
}

const validators = {
  byr: (val) => val.length === 4 && yearBetween(val, 1920, 2002),
  iyr: (val) => val.length === 4 && yearBetween(val, 2010, 2020),
  eyr: (val) => val.length === 4 && yearBetween(val, 2020, 2030),
  hgt: (val) => {
    const matches = val.match(/(\d+)(in|cm)/);

    if (!matches) {
      return false;
    }

    const num = matches[1];
    const unit = matches[2];

    if (unit === 'in') {
      return num >= 59 && num <= 76;
    } else if (unit === 'cm') {
      return num >= 150 && num <= 193;
    } else {
      return false;
    }
  },
  hcl: (val) => val.match(/#(\d|[a-f])+/),
  ecl: (val) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val),
  pid: (val) => val.match(/^\d{9}$/),
  cid: () => true
};

function areFieldsValid (pass) {
  return !Object.keys(pass).some((key) => {
    const val = pass[key];

    return !validators[key](val);
  });
}

module.exports = () => {
  const lines = input.lines('4');
  const passports = lines.reduce((acc, line) => {
    if (line === '') {
      return {
        index: acc.index + 1,
        arr: [...acc.arr, {}]
      };
    }

    const fields = line.split(' ');
    const fieldData = fields.reduce((acc, field) => {
      const [key, val] = field.split(':');

      return { ...acc, [key]: val };
    }, {});

    acc.arr[acc.index] = {
      ...acc.arr[acc.index],
      ...fieldData
    };

    return acc;
  }, { index: 0, arr: [{}] });

  const numValid = passports.arr.reduce((acc, pass) => {
    const passFields = Object.keys(pass);

    if (requiredFields.some((field) => !passFields.includes(field))) {
      // it's missing a required field!
      return acc;
    } else if (!areFieldsValid(pass)) {
      // it has all of the required fields, but at least one is not valid
      return acc;
    } else {
      // it has the required fields, and they're valid
      return acc + 1;
    }
  }, 0);

  log.succeed(numValid);
};
