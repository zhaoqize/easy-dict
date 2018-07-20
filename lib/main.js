const execa = require('execa') 
const inquirer = require('inquirer')

function run (command, args) {
  if (!args) { [command, ...args] = command.split(/\s+/) }
  return execa(command, args, { cwd: this.context })
}

async function rollback (word) {
  
}

module.exports = (word) => {
  rollback(word).catch(err => {
    process.exit(1)
  })
}