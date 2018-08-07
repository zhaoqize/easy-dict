const puppeteer = require('puppeteer')
const logger = require('../log')
const errorHandle = require('../error/index')
const mutations = require('../store/mutations')

/**
 * 谷歌翻译
 * @param {*} { env }
 * @returns
 */
async function googleTranslate (env) {
    let { type, word } = env;
    let browser, page;

    if (!env.page) {
      browser = await puppeteer.launch({
        headless: false,
      });
      logger.info('[google] 启动浏览器');
      
      page = await browser.newPage();
      logger.info('[google] 打开页面');
  
      page.once('load', () => logger.info('[google] 页面加载成功!'));
  
      // 进入网页
      await page.goto('https://translate.google.cn/');
      logger.info('[google] 进入谷歌翻译');
  
      await page.waitForSelector('#gt-text-c');
    }

    // 语言切换
    switch (type) 
    {
      case 'isChinese':
        await page.waitForSelector('#gt-lang-left #sugg-item-zh-CN')
        const chineseLeftBtn = await page.$('#gt-lang-left #sugg-item-zh-CN');
        chineseLeftBtn.click();
        logger.info('[google] 选择[中文]')
        await page.waitForSelector('#gt-lang-right #sugg-item-en')
        const englishRightBtn = await page.$('#gt-lang-right #sugg-item-en');
        englishRightBtn.click();
        logger.info('[google] 选择[英文]')
        break;
      case 'isEnglish':
        await page.waitForSelector('#gt-lang-left #sugg-item-en')
        const englishLeftBtn = await page.$('#gt-lang-left #sugg-item-en');
        englishLeftBtn.click();
        logger.info('[google] 选择[英文]')
        await page.waitForSelector('#gt-lang-right #sugg-item-zh-CN')
        const chineseRightBtn = await page.$('#gt-lang-right #sugg-item-zh-CN');
        chineseRightBtn.click();
        logger.info('[google] 选择[中文]')
        break;
    }

    const sourceHandle = await page.$('#source');
  
    // 清空内容
    await page.evaluate((el) => {
      return el.value = '';
    }, sourceHandle)

    // 输入内容
    await page.type('#source', word, {delay: 50})
    logger.info(`[google] 输入: [ ${word} ]`)

    // TODO 拦截接口是否成功返回 //clients1.google.com/complete/search
    await page.waitFor(500);

    // 获取翻译结果
    const pOutData = await page.evaluateHandle(() => {
      let node  = document.querySelector('#result_box');
      if (node.innerText) {
        return node.innerText;
      }
      return '';
    });

    const outData = await pOutData.jsonValue();

    // 显示其他
    const pOtherData = await page.evaluateHandle(() => {
      let node  = document.querySelector('.gt-cd.gt-cd-md');
      if (node.style.display === 'none') {
        return ''
      }
      return node.innerText.trim();
    });

    const otherData = await pOtherData.jsonValue();

    // 显示额外的信息
    const pMoreData = await page.evaluateHandle(() => {
      let gtdcNode  = document.querySelector('.gt-cd.gt-cd-bd.gt-cd-baf>.gt-cd-c');
      if (gtdcNode.style.display === 'none') {
        return ''
      }
      return gtdcNode.innerText.trim();
    });
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

module.exports = googleTranslate;