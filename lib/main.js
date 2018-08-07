const chalk = require('chalk')
const generateFrame = require('./frame/index')
const { env, translate } = require('./store/state')
const startTranslation = require('./translation')
const logger = require('./log')


/**
 * 命令行入参
 * @param {*} word
 * @param {*} options
 * @returns
 */

async function dict (word, options) {

  // 初始化env
  Object.assign(env, {
    word: word || '',
    source : options.source || 'youdao',
    title : '...'
  })

  // 构建frame
  generateFrame(env, translate);

  // 开始翻译
  if (env.word) {
    try {
      await startTranslation(env, translate)
    } catch (err) {
      logger.error(err)
      throw Error(err)
    }
  }
}

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`[unhandledRejection] ${reason}`)
  console.log(reason)
  setTimeout(() => {
    process.exit(1)
  }, 1000)
});

module.exports = (word, options) => {
  dict(word, options).catch(err => {
    console.log(chalk.red(err));
    logger.error(err)
    process.exit(1)
  })
}