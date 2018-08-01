/**
 * 构建[输入]框架
 *
 * @param {*} blessed
 * @param {*} screen
 * @param {*} result
 * @param {*} env
 */
function inputBox (blessed, screen, result, env) {
  let { inputData } = result;
  let { title } = env;
  const inputBox = blessed.box({
    parent: screen,
    scrollable: true,
    label: ` ${title} `,
    left: 0,
    top: '20%',
    width: '50%',
    height: '40%',
    style: {
      bg: '#f3f3f3',
      fg: '#222'
    },
    border: {
      type: 'line',
      fg: 'cyan'
    },
    content: inputData
  });

  env.inputBox = inputBox;
}

module.exports = inputBox;