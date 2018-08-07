const puppeteer = require('puppeteer') 
const logger = require('../log')
const errorHandle = require('../error/index')
const mutations = require('../store/mutations')

/**
 * 有道翻译
 * @param {*} { env }
 * @returns
 */

async function youdaoTranslate (env) {
  let { word } = env;
  let browser,page;

  if (!env.page) { 
    browser = await puppeteer.launch({
      headless: false,
    });
    logger.info('[youdao] 启动浏览器');
    
    page = await browser.newPage();
    logger.info('[youdao] 打开页面');
  
    page.once('load', () => logger.info('[youdao] 页面加载成功!'));
  
    // 进入网页
    await page.goto('http://fanyi.youdao.com//');
    logger.info('[youdao] 进入有道翻译');
  
    await page.waitForSelector('.fanyi__input');
  } else {
    page = env.page
  }

  const inputOriginalHandle = await page.$('#inputOriginal');
  
  // 清空内容
  await page.evaluate((el) => {
    return el.value = '';
  }, inputOriginalHandle)

  // 输入内容
  await page.type('#inputOriginal', word, {delay: 50})
  logger.info(`[youdao] 输入: [ ${word} ]`)

  // TODO
  await page.waitFor(500);

  // 获取翻译结果
  const pOutData = await page.evaluateHandle(() => {
    let node  = document.querySelector('#transTarget');
    if (node.innerText) {
      return node.innerText;
    }
    return '';
  });

  const outData = await pOutData.jsonValue();

  // 显示其他数据
  const otherData = '';

  // 显示额外的信息
  const pMoreData = await page.evaluateHandle(() => {
    let idNode  = document.querySelector('.input__target__dict');
    if (idNode.style.display === 'block') {
      let node = document.querySelector('.input__target__dict>.dict__relative');
      return node.innerText.trim();
    }
    return '';
  });

  // 更多结果
  const moreData = await pMoreData.jsonValue();

  errorHandle(page);

  mutations.ADD_GLOBAL_PAGE(env, page);

  return {
    inputData: word,
    outData,
    otherData,
    moreData
  };
}

module.exports = youdaoTranslate;