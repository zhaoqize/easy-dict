const puppeteer = require('puppeteer') 

async function googleTranslate ({ type, word }) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  // console.log('启动浏览器');
  
  const page = await browser.newPage();
  // console.log('打开页面');

  // 进入网页
  await page.goto('https://translate.google.cn/');
  // console.log('进入谷歌翻译');

  await page.waitFor('#gt-text-c');

  // 语言切换
  switch (type) 
  {
    case 'isChinese':
      // console.log('选择[中文]')
      const chineseLeftBtn = await page.$('#gt-lang-left #sugg-item-zh-CN');
      const englishRightBtn = await page.$('#gt-lang-right #sugg-item-en');
      chineseLeftBtn.click();
      await page.waitFor(200);
      englishRightBtn.click();
      break;
    case 'isEnglish':
      // console.log('选择[英文]')
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
  // console.log(`输入: [ ${word} ]`)

  // 显示输入
  const inputData = word;

  await page.waitFor(500);

  // 获取翻译结果
  const outData = await page.$eval('#result_box', el => el.innerText);
  
  // 显示log
  const pLogData = await page.evaluateHandle(() => {
    let gtmdNode  = document.querySelector('.gt-cd.gt-cd-md');
    if (gtmdNode.style.display === 'none') {
      return ''
    }
    return gtmdNode.innerText.trim();
  });

  const logData = await pLogData.jsonValue();

  // 显示额外的信息
  const pMoreData = await page.evaluateHandle(() => {
    let gtdcNode  = document.querySelector('.gt-cd.gt-cd-bd.gt-cd-baf');
    if (gtdcNode.style.display === 'none') {
      return ''
    }
    return gtdcNode.innerText.trim();
  });
  const moreData = await pMoreData.jsonValue();

  // 关闭browser
  page.close();

  return {
    inputData,
    outData,
    logData,
    moreData
  };
}

module.exports = googleTranslate;