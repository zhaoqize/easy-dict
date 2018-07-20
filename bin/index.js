#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('dict <word>')
  .description('A Tool For Translaion')
  .action((word) => {
      require('../lib/main.js')(word);
  });

program.parse(process.argv);