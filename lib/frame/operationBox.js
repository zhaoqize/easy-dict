/**
 * 构建[操作]框架
 *
 * @param {*} blessed
 * @param {*} screen
 * @param {*} result
 * @param {*} env
 */
function operationBox (blessed, screen, result, env) {
  const operationBox = blessed.textarea({
    parent: screen,
    label: ' 操作区 ',
    left: 0,
    top: 0,
    width: '50%',
    height: '20%',
    style: {
      bg: '#f3f3f3',
      fg: '#222'
    },
    border: {
      type: 'line',
      fg: 'cyan'
    },
    tags: true
  })

  env.operationBox = operationBox;

  screen.key('i', function() {
    operationBox.readInput(function() {});
  });
}

module.exports = operationBox;