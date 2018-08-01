const startTranslation = require('../translation')
const judgeLang = require('../judgeLang');

/**
 * 构建[搜索按钮]框架
 *
 * @param {*} blessed
 * @param {*} screen
 * @param {*} result
 * @param {*} env
 */
function searchBtn (blessed, screen, result, env) {
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
    top: 2,
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

  env.searchBtn = searchBtn;

  searchBtn.on('press', async function() {
    let searchWord = env.operationBox.getValue() || '';
    env.word = searchWord;
    env.inputBox.setContent(env.word);

    // 判断
    judgeLang(env);
    env.inputBox.setLabel(env.title);
    screen.render();
    let translationResult = await startTranslation(env);

    // 更改数据
    env.outputBox.setContent(translationResult.outData);
    env.otherBox.setContent(translationResult.otherData);
    env.moreBox.setContent(translationResult.moreData);
    screen.render();
  });
}

module.exports = searchBtn;