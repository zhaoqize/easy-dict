const puppeteer = require('puppeteer') 

async function youdaoTranslate ({ type, word }) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  // console.log('启动浏览器');
  
  const page = await browser.newPage();
  // console.log('打开页面');

  // 进入网页
  await page.goto('http://fanyi.youdao.com//');
  // console.log('进入有道翻译');

  await page.waitFor('.fanyi__input');

  // 输入内容
  await page.type('#inputOriginal', word)
  // console.log(`输入: [ ${word} ]`)

  await page.waitFor(600);

  // 显示输入(tlData)
  const inputData = word;
  
  // 获取翻译结果(trData)
  const outData = await page.$eval('#transTarget', el => el.innerText.trim());
  
  // 显示Log(blData)
  const logData = '';

  // 显示额外的信息(brData)
  const pMoreData = await page.evaluateHandle(() => {
    let itdNode  = document.querySelector('.input__target__dict');
    if (itdNode.style.display === 'block') {
      return itdNode.innerText.trim();
    }
    return '';
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

module.exports = youdaoTranslate;