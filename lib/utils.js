const isChinese = function (parameter) {
  let cRex = new RegExp('[\u4e00-\u9fa5]');
  return cRex.test(parameter);
}

const isEnglish = function (parameter) {
  let eRex = new RegExp('[a-zA-Z]');
  return eRex.test(parameter);
}

module.exports = {
  isChinese,
  isEnglish
}