const mutations = require('../store/mutations')

/**
 * 构建[输出]框架
 *
 * @param {*} blessed
 * @param {*} screen
 * @param {*} result
 * @param {*} env
 */
function outputBox (blessed, screen, translate, env) {
  let { data } = translate;
  const outputBox = blessed.box({
    parent: screen,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
      ch: ' ',
      inverse: true
    },
    keys: true,
    label: ' 输出 ',
    left: '50%-1',
    top: '20%',
    width: '50%+1',
    height: '40%',
    padding: 1,
    style: {
      bg: '#f3f3f3',
      fg: '#222'
    },
    border: {
      type: 'line',
      fg: 'cyan'
    },
    content: data.outputBox
  });

  mutations.CHANGE_TRANSLATE_FRAME_OUTPUTBOX(translate, outputBox);
}

module.exports = outputBox;