const { 
    isChinese,
    isEnglish 
  } = require('./utils')
const logger = require('./log')
const mutations = require('./store/mutations')
const actions = require('./store/actions')

/**
 * 判断语种
 *
 * @param {*} env
 * @returns
 */
function judgeLang (env, translate) {
  let { word, screen  } = env;
  if (isChinese(word)) {
    mutations.CHANGE_ENV_TITLEANDTYPE(env, {
      title: '[中] >> [英]',
      type: 'isChinese'
    })
    actions.updateInputBoxLabel(translate, {
      label: '[中] >> [英]'
    });
    screen.render();

    logger.info('[中] >> [英]')
  } else if (isEnglish(word)) {
    mutations.CHANGE_ENV_TITLEANDTYPE(env, {
      title: '[英] >> [中]',
      type: 'isEnglish'
    })
    actions.updateInputBoxLabel(translate, {
      label: '[英] >> [中]'
    });

    logger.info('[英] >> [中]')
  } else {
    console.log('无法识别，暂不处理')
    logger.fatal('无法识别，暂不处理')
    return;
  }
}

module.exports = judgeLang;
