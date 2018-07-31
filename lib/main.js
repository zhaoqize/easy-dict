const chalk = require('chalk')
const frame = require('./frame')
const googleTranslate = require('./google')
const youdaoTranslate = require('./youdao')
const { isChinese, isEnglish } = require('./utils')

async function dict (word, options) {
  let source = options.source || 'youdao'
  let type, title;
  if (isChinese(word)) {
    title = '[中] >> [英]';
    type = 'isChinese';
  } else if (isEnglish(word)) {
    title = '[英] >> [中]';
    type = 'isEnglish';
  } else {
    console.log('无法识别，暂不处理')
    return;
  }

  let translationResult;
  if (source === 'google') {
    translationResult = await googleTranslate({
      type,
      word
    });
  } else {
    translationResult = await youdaoTranslate({
      type,
      word
    });
  }

  // 嵌入frame layout
  frame(title, translationResult);
}

module.exports = (word, options) => {
  dict(word, options).catch(err => {
    process.exit(1)
  })
}