const chalk = require('chalk')
const generateFrame = require('./frame/index')
const startTranslation = require('./translation')
const logger = require('./log')


/**
 * 命令行入参
 * @param {*} word
 * @param {*} options
 * @returns
 */

async function dict (word, options) {

  let env = {};
  env.word = word || '';
  env.source = options.source || 'google';
  env.title = '----';
  // style
  // env.operationBoxStyle = {};
  // env.searchBtnStyle = {};
  // env.inputBoxStyle = {};
  // env.outputBoxStyle = {};
  // env.otherBoxStyle = {};
  // env.moreBoxStyle = {}
 
  let translate = {
    frame: { // 框架集
      operationBox: '',
      searchBtn: '',
      inputBox: '',
      outputBox: '',
      otherBox: '',
      moreBox: ''
    }, 
    data: { // 框架输出结果
      inputBox: '',
      outputBox: '',
      otherBox: '',
      moreBox: ''
    } 
  };

  // 构建frame
  generateFrame(env, translate);

  // 开始翻译
  if (env.word) {
    await startTranslation(env, translate)
      .catch((err) => {
        logger.error(err)
      })
  }
}

module.exports = (word, options) => {
  dict(word, options).catch(err => {
    console.log(chalk.red(err));
    logger.error(err)
    process.exit(1)
  })
}