const blessed = require('blessed')

const screen = blessed.screen({
  dump: `${__dirname}/logs/dock.log`,
  smartCSR: true,
  dockBorders: true,
  warnings: true,
  fullUnicode: true,
  terminal: 'xterm-256color'
});

module.exports = function (title, result) {
  const inputData = blessed.box({
    parent: screen,
    label: ` ${title} `,
    left: 0,
    top: 0,
    width: '50%',
    height: '50%',
    border: 'line',
    content: result.inputData
  });
  const outData = blessed.box({
    parent: screen,
    label: ' 输出 ',
    left: '50%-1',
    top: 0,
    width: '50%+1',
    height: '50%',
    border: 'line',
    content: result.outData
  });
  const logData = blessed.box({
    parent: screen,
    label: ' 日志 ',
    left: 0,
    top: '50%-1',
    width: '50%',
    height: '50%+1',
    border: 'line',
    content: result.logData
  });
  const moreData = blessed.listtable({
    parent: screen,
    label: ' 更多解释 ',
    left: '50%-1',
    top: '50%-1',
    width: '50%+1',
    height: '50%+1',
    border: 'line',
    content: result.moreData
  });

  screen.key(['escape', 'q', 'C-c'], () => {
    process.exit(1);
    return screen.destroy();
  });
  
  screen.render();
}