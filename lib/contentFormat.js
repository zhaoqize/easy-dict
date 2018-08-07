// const youdaoFormat = function (data) {
//   let { moreBox } = data;
//   if (moreBox) {

//   }
// }

// const googleFormat = function (data) {

// }

const contentFormat = function (env, translate) {
  let { source } = env;
  let { data } = translate;
  if (source === 'youdao') {
    youdaoFormat(data);
  } else {
    googleFormat(data);
  }
}

module.exports = contentFormat;