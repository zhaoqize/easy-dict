/**
 * 构建[输出]框架
 *
 * @param {*} blessed
 * @param {*} screen
 * @param {*} result
 * @param {*} env
 */
function outputBox (blessed, screen, result, env) {
  let { outData } = result;
  const outputBox = blessed.box({
    parent: screen,
    scrollable: true,
    label: ' 输出 ',
    left: '50%-1',
    top: '20%',
    width: '50%+1',
    height: '40%',
    style: {
      bg: '#f3f3f3',
      fg: '#222'
    },
    border: {
      type: 'line',
      fg: 'cyan'
    },
    content: outData
  });

  env.outputBox = outputBox;
}

module.exports = outputBox;