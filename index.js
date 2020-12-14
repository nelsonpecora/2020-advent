#!/usr/bin/env node
const meow = require('meow');
const fs = require('fs');
const path = require('path');
const scripts = fs.readdirSync(path.join(__dirname, 'scripts'))
  .filter((filename) => filename.match(/\.js$/))
  .reduce((acc, filename) => {
    const file = require(`.${path.sep}scripts${path.sep}${filename}`);

    return {
      ...acc,
      [path.basename(filename, '.js')]: file
    }
  }, {});

const cli = meow(`
  Usage
      $ advent <day>

    Examples
      $ advent 1
`);

scripts[cli.input[0]]();
