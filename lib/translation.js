const logger = require('./log.js')
const googleTranslate = require('./google')
const youdaoTranslate = require('./youdao')

/**
 * 翻译
 * @param {*} env 相关参数
 */

async function startTranslation (env) {
  let { source } = env;
  let translationResult;
  
  if (source === 'google') {
    logger.info('使用 google 翻译')
    translationResult = await googleTranslate(env);
  } else {
    logger.info('使用 youdao 翻译')
    translationResult = await youdaoTranslate(env);
  }
  
  return translationResult;
}

module.exports = startTranslation;