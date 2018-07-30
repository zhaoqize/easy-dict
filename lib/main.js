// const execa = require('execa') 
const inquirer = require('inquirer')
const chalk = require('chalk')
const puppeteer = require('puppeteer') 
const { isChinese, isEnglish } = require('./utils')

async function getGoogleTranslate ({ type, word }) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  console.log('启动浏览器');
  
  const page = await browser.newPage();
  console.log('打开页面');

  // 进入网页
  await page.goto('https://translate.google.cn/');
  console.log('进入谷歌翻译');

  await page.waitFor('#gt-text-c');

  // 语言切换
  switch (type) 
  {
    case 'isChinese':
      console.log('选择[中文]')
      const chineseLeftBtn = await page.$('#gt-lang-left #sugg-item-zh-CN');
      const englishRightBtn = await page.$('#gt-lang-right #sugg-item-en');
      chineseLeftBtn.click();
      await page.waitFor(200);
      englishRightBtn.click();
      break;
    case 'isEnglish':
      console.log('选择[英文]')
      const englishLeftBtn = await page.$('#gt-lang-left #sugg-item-en');
      const chineseRightBtn = await page.$('#gt-lang-right #sugg-item-zh-CN');
      englishLeftBtn.click();
      await page.waitFor(200);
      chineseRightBtn.click();
      break;
  }

  await page.waitFor(200);

  // 输入内容
  await page.type('#source', word)
  console.log(`输入: [ ${word} ]`)

  await page.waitFor(500);

  // 获取翻译结果
  const resultValue = await page.$eval('#result_box', el => el.innerText);

  page.close();

  return resultValue;
}

async function getYoudaoTranslate ({ type, word }) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  console.log('启动浏览器');
  
  const page = await browser.newPage();
  console.log('打开页面');

  // 进入网页
  await page.goto('http://fanyi.youdao.com//');
  console.log('进入有道翻译');

  await page.waitFor('.fanyi__input');

  // 输入内容
  await page.type('#inputOriginal', word)
  console.log(`输入: [ ${word} ]`)

  await page.waitFor(600);

  // 获取翻译结果
  // TODO:const resultValue = await page.evaluateHandle(() => document.querySelector('#transTarget').innerText.trim());
  const resultValue = await page.$eval('#transTarget', el => el.innerText.trim());
  
  page.close();
  return resultValue;
}

async function dict (word, options) {
  let source = options.source || 'youdao'
  let type;
  if (isChinese(word)) {
    console.log('[中]->[英]')
    type = 'isChinese';
  } else if (isEnglish(word)) {
    type = 'isEnglish';
    console.log('[英]->[中]')
  } else {
    console.log('无法识别，暂不处理')
    return;
  }

  let translationResult;
  if (source === 'google') {
    translationResult = await getGoogleTranslate({
      type,
      word
    });
  } else {
    translationResult = await getYoudaoTranslate({
      type,
      word
    });
  }
  
  console.log('翻译结果: ', translationResult);
}

module.exports = (word, options) => {
  dict(word, options).catch(err => {
    process.exit(1)
  })
}