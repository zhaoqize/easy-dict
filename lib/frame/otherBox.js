const mutations = require('../store/mutations')

/**
 * 构建[其他]框架
 *
 * @param {*} blessed
 * @param {*} screen
 * @param {*} result
 * @param {*} env
 */
function otherBox (blessed, screen, translate, env) {
  let { data } = translate;
  const otherBox = blessed.box({
    parent: screen,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
      ch: ' ',
      inverse: true
    },
    keys: true,
    label: ' 其他 ',
    left: 0,
    top: '60%-1',
    width: '50%',
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
    content: data.otherBox
  });

  mutations.CHANGE_TRANSLATE_FRAME_OTHERBOX(translate, otherBox);
}

module.exports = otherBox;