const startTranslation = require('../translation')
const mutations = require('../store/mutations')
const actions = require('../store/actions')
const logger = require('../log')

/**
 * 构建[搜索按钮]框架
 *
 * @param {*} blessed
 * @param {*} screen
 * @param {*} result
 * @param {*} env
 */
function searchBtn (blessed, screen, translate, env) {
  const searchBtn = blessed.button({
    parent: screen,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 10,
      right: 10,
      top: 1,
      bottom: 1
    },
    top: 1,
    left: '50%',
    name: 'submit',
    content: '翻译',
    style: {
      bg: '#e02433',
      fg: 'white',
      hover: {
        bg: 'gray'
      },
      bold: true,
    }
  });

  mutations.CHANGE_TRANSLATE_FRAME_SEARCHBTN(translate, searchBtn);

  searchBtn.on('press', async function() {
    let { frame } = translate;
    let searchWord = frame.operationBox.getValue() || '';
    mutations.CHANGE_ENV_WORD(env, searchWord);
    actions.updateInputBoxContent(env, translate);
    screen.render();

    try {
      await startTranslation(env, translate)
    } catch (err) {
      logger.error(err)
      throw Error(err)
    }
  });
}

module.exports = searchBtn;