[![npm](https://img.shields.io/npm/v/easy-dict.svg?style=flat)](https://github.com/zhaoqize/easy-dict)
[![GitHub license](https://img.shields.io/github/license/zhaoqize/easy-dict.svg)](https://github.com/zhaoqize/easy-dict/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
# easy-dict
easy-dict 是一个命令行词典

### 安装
```js
npm install -g easy-dict
```

### 使用
1、默认使用 `google` 翻译
```js
easy dict <word>
```

2、使用 `youdao` 词典
```js
easy dict <word> -s youdao
```

3、翻译英文单词
```js
easy dict question
```

<img src="./lib/img/1.png" width="400">

4、翻译英文句子
```js
easy dict 'question is a question'
```

<img src="./lib/img/2.png" width="400">

5、翻译中文单词
```js
easy dict 中国
```

<img src="./lib/img/3.png" width="400">

6、翻译中文句子
```js
easy dict '我是中国人'
```

<img src="./lib/img/4.png" width="400">

执行 `easy dict -h`
```js
  Usage: dict [options] <word>

  A Tool For Translaion

  Options:

    -s, --source <name>  default youdao, where is the source for dict
    -h, --help           output usage information
```

### License

MIT © [zhaoqize]()