const mutations = require('../store/mutations')

/**
 * 构建[更多]框架
 *
 * @param {*} blessed
 * @param {*} screen
 * @param {*} result
 * @param {*} env
 */
function moreBox (blessed, screen, translate, env) {
  let { data } = translate;
  const moreBox = blessed.box({
    parent: screen,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
      ch: ' ',
      inverse: true
    },
    keys: true,
    label: ' 更多解释 ',
    left: '50%-1',
    top: '60%-1',
    width: '50%+1',
    height: '40%+1',
    padding: 1,
    style: {
      bg: '#f3f3f3',
      fg: '#222'
    },
    border: {
      type: 'line',
      fg: 'cyan'
    },
    content: data.moreBox
  });

  mutations.CHANGE_TRANSLATE_FRAME_MOREBOX(translate, moreBox);
}

module.exports = moreBox;