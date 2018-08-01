const log4js = require('log4js');

log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/dict.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');

module.exports = logger;