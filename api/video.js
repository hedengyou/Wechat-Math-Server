const router = require('koa-joi-router');
const Joi = router.Joi;

const videoModel = require('../model/video');

const getOne = {
  validate: {
    params: {
      id: Joi.string(),
    },
  },
  handler: async (ctx) => {
    const { params: { id } } = ctx;
    ctx.logger.info('params[查询单个视频资料]:', id);
    let video;
    try {
      video = await videoModel.findOne({ _id: id });
    } catch (error) {
      ctx.logger.error('错误!查询数据库错误![查询单个视频资料]:', error);
      ctx.throw(500, '查询数据库出错');
    }
    ctx.logger.info('查询数据库成功[查询单个视频资料]: ', video);
    ctx.status = 200;
    ctx.body = video.path;
  },
};

module.exports = {
  getOne
};
