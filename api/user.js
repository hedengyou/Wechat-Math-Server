const Boom = require('boom');
const router = require('koa-joi-router');
const Joi = router.Joi;

const userModel = require('../model/user');

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

const getAll = {
  handler: async (ctx) => {
    let users;
    try {
      users = await userModel.find();
    } catch (error) {
      ctx.logger.error('错误!查询数据库错误![查询全部用户资料]: ', error);
      ctx.body = Boom.badRequest();
    }
    ctx.logger.info('查询数据库成功[查询全部用户资料]: ', users);
    ctx.status = 200;
    ctx.body = users;
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

const update = {
  validate: {
    body: {
      id: Joi.string(),
      name: Joi.string(),
      password: Joi.string(),
      email: Joi.string().email(),
      tags: Joi.array().optional(),
    },
    type: 'json',
  },
  handler: async (ctx) => {
    const payload = ctx.request.body;
    ctx.logger.info('payload[更新用户资料]:', payload);
    try {
      await userModel.update({ _id: payload.id }, payload);
    } catch (error) {
      ctx.logger.error('错误!查询数据库错误![更新用户资料]');
      ctx.body = Boom.badRequest();
    }
    ctx.logger.info('写入数据库成功[更新用户资料]', payload);
    ctx.status = 200;
    ctx.body = payload;
  },
};

const remove = {
  validate: {
    params: {
      id: Joi.string(),
    },
  },
  handler: async (ctx) => {
    const { id } = ctx.request.params;
    ctx.logger.info('params[删除用户资料]:', id);
    try {
      await userModel.remove({ _id: id });
    } catch (error) {
      ctx.logger.error('查询数据库错误![删除用户资料]');
      ctx.body = Boom.badImplementation();
    }
    ctx.logger.info('写入数据库成功[删除用户资料]', id);
    ctx.status = 204;
    ctx.body = {};
  },
};

module.exports = {
  getOne,
  create,
  getAll,
  update,
  remove,
};