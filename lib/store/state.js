const state = {
  env: {
    word: '',
    source: '',
    title: '',
    screen: '',
    blessed: '',
    page: ''
  },
  translate : {
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
  }
}

module.exports = state;