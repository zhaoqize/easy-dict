const chalk = require('chalk')
const generateFrame = require('./frame/index')
const startTranslation = require('./translation')
const logger = require('./log')
const judgeLang = require('./judgeLang');


/**
 * 命令行入参
 * @param {*} word
 * @param {*} options
 * @returns
 */

async function dict (word, options) {

  let env = {}
  env.source = options.source || 'google'
  env.word = word;

  // 判断语言类型
  judgeLang(env);

  // 开始翻译
  let translationResult = await startTranslation(env);
  
  // 嵌入frame layout
  generateFrame(env, translationResult);
  
}

module.exports = (word, options) => {
  dict(word, options).catch(err => {
    console.log(chalk.red(err));
    logger.error(err)
    process.exit(1)
  })
}