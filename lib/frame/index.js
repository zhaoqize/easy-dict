const blessed = require('blessed')
const operationBox = require('./operationBox');
const searchBtn = require('./searchBtn');
const inputBox = require('./inputBox');
const outputBox = require('./outputBox');
const otherBox = require('./otherBox');
const moreBox = require('./moreBox');

const screen = blessed.screen({
  // dump: '../logs/frame.log',
  smartCSR: true,
  dockBorders: true,
  warnings: true,
  fullUnicode: true,
  terminal: 'xterm-256color'
});

/**
 * 构建终端布局
 * @param {*} env
 * @param {*} result 
 */
const generateFrame = function (env, result) {
  operationBox(blessed, screen, result, env);
  searchBtn(blessed, screen, result, env);
  inputBox(blessed, screen, result, env);
  outputBox(blessed, screen, result, env);
  otherBox(blessed, screen, result, env);
  moreBox(blessed, screen, result, env);

  screen.key(['escape', 'q', 'C-c'], () => {
    process.exit(1);
    return screen.destroy();
  });
  
  screen.render();
}

module.exports = generateFrame;