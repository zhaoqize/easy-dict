const blessed = require('blessed')
const operationBox = require('./operationBox');
const searchBtn = require('./searchBtn');
const inputBox = require('./inputBox');
const outputBox = require('./outputBox');
const otherBox = require('./otherBox');
const moreBox = require('./moreBox');
const mutations = require('../store/mutations')

const screen = blessed.screen({
  // dump: '../../logs/frame.log',
  smartCSR: true,
  dockBorders: true,
  warnings: true,
  fullUnicode: true,
  terminal: 'xterm-256color'
});



/**
 * 构建终端布局
 * @param {*} env
 * @param {*} translate 
 */
const generateFrame = function (env, translate) {
  mutations.ADD_GLOBAL_VAR(env, {
    screen,
    blessed
  });

  operationBox(blessed, screen, translate, env);
  searchBtn(blessed, screen, translate, env);
  inputBox(blessed, screen, translate, env);
  outputBox(blessed, screen, translate, env);
  otherBox(blessed, screen, translate, env);
  moreBox(blessed, screen, translate, env);

  screen.key(['escape', 'q', 'C-c'], () => {
    process.exit(1);
    return screen.destroy();
  });
  
  screen.render();
}

module.exports = generateFrame;