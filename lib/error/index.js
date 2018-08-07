const logger = require('../log')

const errorHandle = function (page) {
  page.on('error', (err) => {
    logger.error(`[error] ${err}`);
  })
  page.on('pageerror', (err) => {
    logger.error(`[pageerror] ${err}`);
  })
}

module.exports = errorHandle;