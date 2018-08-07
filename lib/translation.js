const logger = require('./log.js')
const judgeLang = require('./judgeLang')
const googleTranslate = require('./dictionarys/google')
const youdaoTranslate = require('./dictionarys/youdao')
const mutations = require('./store/mutations')
const actions = require('./store/actions')

/**
 * 翻译
 * @param {*} env 相关参数
 * @param {*} translate
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
  try {
    if (source === 'google') {
      logger.info('使用 google 翻译')
      translationResult = await googleTranslate(env)
    } else {
      logger.info('使用 youdao 翻译')
      translationResult = await youdaoTranslate(env)
    }
  } catch (err) {
    logger.error(err)
    throw Error(err)
  }

  logger.info(`翻译结果: 1.${translationResult.inputData}\n2.${translationResult.outData}\n3.${translationResult.otherData}\n4.${translationResult.moreData}`)
  
  mutations.CHANGE_TRANSLATE_DATA(translate, translationResult);
  actions.updateOutputBoxContent(translate);
  actions.updateOtherBoxContent(translate);
  actions.updateMoreBoxContent(translate);
  screen.render();
}

module.exports = startTranslation;