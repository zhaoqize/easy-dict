/**
 * 构建[其他]框架
 *
 * @param {*} blessed
 * @param {*} screen
 * @param {*} result
 * @param {*} env
 */
function otherBox (blessed, screen, result, env) {
  let { otherData } = result;
  const otherBox = blessed.box({
    parent: screen,
    scrollable: true,
    label: ' 其他 ',
    left: 0,
    top: '60%-1',
    width: '50%',
    height: '40%+1',
    style: {
      bg: '#f3f3f3',
      fg: '#222'
    },
    border: {
      type: 'line',
      fg: 'cyan'
    },
    content: otherData
  });

  env.otherBox = otherBox;
}

module.exports = otherBox;