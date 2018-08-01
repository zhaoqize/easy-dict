/**
 * 构建[更多]框架
 *
 * @param {*} blessed
 * @param {*} screen
 * @param {*} result
 * @param {*} env
 */
function moreBox (blessed, screen, result, env) {
  let { moreData } = result;
  const moreBox = blessed.box({
    parent: screen,
    scrollable: true,
    label: ' 更多解释 ',
    left: '50%-1',
    top: '60%-1',
    width: '50%+1',
    height: '40%+1',
    style: {
      bg: '#f3f3f3',
      fg: '#222'
    },
    border: {
      type: 'line',
      fg: 'cyan'
    },
    content: moreData
  });

  env.moreBox = moreBox;
}

module.exports = moreBox;