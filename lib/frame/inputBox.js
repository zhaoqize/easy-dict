const mutations = require('../store/mutations')

/**
 * 构建[输入]框架
 *
 * @param {*} blessed
 * @param {*} screen
 * @param {*} result
 * @param {*} env
 */
function inputBox (blessed, screen, translate, env) {
  let { data } = translate;
  let { title } = env;
  const inputBox = blessed.box({
    parent: screen,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
      ch: ' ',
      inverse: true
    },
    keys: true,
    label: ` ${title} `,
    left: 0,
    top: '20%',
    width: '50%',
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
    content: data.inputBox
  });

  mutations.CHANGE_TRANSLATE_FRAME_INPUTBOX(translate, inputBox);
}

module.exports = inputBox;