const fs = require('fs');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const moment = require('moment');

const logDir = 'logs';
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logger = bunyan.createLogger({
  name: 'koa-api-server',
  streams: [
    {
      level: 'debug',
      stream: bformat({ outputMode: 'short' }),
    },
    {
      level: 'info',
      type: 'rotating-file',
      path: `${logDir}/info.log`,
      period: '1d',
      count: 7,
    },
    {
      level: 'error',
      type: 'rotating-file',
      path: `${logDir}/error.log`,
      period: '1d',
      count: 14,
    },
  ],
});

function logRequest(req) {
  const { method, href } = req;
  logger.info(moment().format("YYYY-MM-DD HH:mm:ss"),method, href);
}

module.exports = function(opts = {}){
  return async function(ctx, next) {
    logRequest(ctx.request);
    ctx.logger = logger;
    await next();
  };
};