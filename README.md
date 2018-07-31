[![NPM version][npm-image]][npm-url] [![GitHub license](https://img.shields.io/github/license/zhaoqize/easy-dict.svg)](https://github.com/zhaoqize/easy-rollback/blob/master/LICENSE)
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

4、翻译英文句子
```js
easy dict 'question is a question'
```

5、翻译中文单词
```js
easy dict 中国
```

6、翻译中文句子
```js
easy dict '我是中国人'
```

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