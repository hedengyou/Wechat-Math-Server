const router = require('koa-joi-router');
const Joi = router.Joi;

const lessonModel = require('../model/lesson');

const getAll = {
  handler: async (ctx) => {
    let lessons;
    try {
      lessons = await lessonModel.find();
    } catch (error) {
      ctx.logger.error('错误!查询数据库错误![查询全部课程资料]: ', error);
      ctx.throw(500, '查询数据库出错');
    }
    ctx.logger.info('查询数据库成功[查询全部课程资料]: ', lessons);
    ctx.body = lessons;
  },
};

const create = {
  validate: {
    payload: {
      name: Joi.string(),
      chapter: Joi.array(),
      subChapter: Joi.array(),
      video: Joi.string()
    },
    type: 'json'
  },
  handler: async (ctx) => {
    ctx.logger.info('payload[创建课程]:', ctx.request.body);
    const modelInstance = lessonModel(ctx.request.body);
    let lesson;
    try {
      lesson = await modelInstance.save();
    } catch (error) {
      ctx.logger.error('错误!写入数据库错误![创建课程]:', error);
      ctx.throw(500, '查询数据库出错');
    }
    ctx.logger.info('写入数据库成功[创建课程]:', lesson);
    ctx.body = lesson;
  },
};

module.exports = {
  getAll,
  create
};