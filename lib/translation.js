const logger = require('./log.js')
const judgeLang = require('./judgeLang')
const googleTranslate = require('./dictionarys/google')
const youdaoTranslate = require('./dictionarys/youdao')
const mutations = require('./store/mutations')
const actions = require('./store/actions')

/**
 * 翻译
 * @param {*} env 相关参数
 */

async function startTranslation (env, translate) {
  let { screen, source, word } = env;
  let translationResult;

  // 语言判断
  judgeLang(env, translate);

  mutations.CHANGE_ENV_WORD(env, word);
  actions.updateInputBoxContent(env, translate);
  screen.render();

  // 开始翻译
  if (source === 'google') {
    logger.info('使用 google 翻译')
    translationResult = await googleTranslate(env)
      .catch((err) => {
        logger.error(`[googleTranslate] ${err}`)
      })
  } else {
    logger.info('使用 youdao 翻译')
    translationResult = await youdaoTranslate(env)
      .catch((err) => {
        logger.error(`[youdaoTranslate] ${err}`)
      })
  }
  logger.info(`翻译结果: ${translationResult}`)
  mutations.CHANGE_TRANSLATE_DATA(translate, translationResult);
  
  actions.updateOutputBoxContent(translate);
  actions.updateOtherBoxContent(translate);
  actions.updateMoreBoxContent(translate);
  screen.render();
}

module.exports = startTranslation;