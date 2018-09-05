## 简介
基于`koa2`从零搭建的`api server`

### 插件
将`mongoose`和`logger`代码都封装成了插件的形式加载

### 路由
使用[`koa-joi-router`](https://www.npmjs.com/package/koa-joi-router)搭建`rest-api`

### rest api
```javascript
const getOne = {
  validate: {
    params: {
      id: Joi.string(),
    },
  },
  handler: async (ctx) => {
    const { params: { id } } = ctx;
    ctx.logger.info('params[查询单个用户资料]:', id);
    let user;
    try {
      user = await userModel.find({ _id: id }, { password: 0 });
    } catch (error) {
      ctx.logger.error('错误!查询数据库错误![查询单个用户资料]:', error);
      ctx.body = Boom.badRequest();
    }
    ctx.logger.info('查询数据库成功[查询单个用户资料]: ', user);
    ctx.status = 200;
    ctx.body = user;
  },
};


const create = {
  validate: {
    body: {
      name: Joi.string(),
      password: Joi.string(),
      email: Joi.string().email(),
      tags: Joi.array().optional(),
    },
    type: 'json',
  },
  handler: async (ctx) => {
    ctx.logger.info('payload[创建用户]:', ctx.request.body);
    const modelInstance = userModel(ctx.request.body);
    let user;
    try {
      user = await modelInstance.save();
    } catch (error) {
      ctx.logger.error('错误!写入数据库错误![创建用户]:', error);
      ctx.body = Boom.badRequest();
    }
    ctx.logger.info('写入数据库成功[创建用户]:', user);
    ctx.status = 201;
    ctx.body = user;
  },
};

```

### 日志
使用`bunyan`包自己封装了一个日志插件
```javascript
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
```