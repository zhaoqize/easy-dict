#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('dict <word>')
  .description('A Tool For Translaion')
  .option('-s, --source <name>', 'default google, where is the source for dict')
  .action((word, args) => {
      require('../lib/main.js')(word, cleanArgs(args));
  });

function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = o.long.replace(/^--/, '')
    if (typeof cmd[key] !== 'function') {
      args[key] = cmd[key]
    }
  })
  return args
}

program.parse(process.argv);