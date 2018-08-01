const { 
    isChinese,
    isEnglish 
  } = require('./utils')
const logger = require('./log')

/**
 * 判断语种
 *
 * @param {*} env
 * @returns
 */
function judgeLang (env) {
  let { word  } = env;
  if (isChinese(word)) {
    env.title = '[中] >> [英]';
    env.type = 'isChinese';

    logger.info('[中] >> [英]')
  } else if (isEnglish(word)) {
    env.title = '[英] >> [中]';
    env.type = 'isEnglish';

    logger.info('[英] >> [中]')
  } else {
    console.log('无法识别，暂不处理')
    logger.fatal('无法识别，暂不处理')
    return;
  }
}

module.exports = judgeLang;
