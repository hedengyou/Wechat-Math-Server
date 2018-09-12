const jwt = require('jsonwebtoken');
const Boom = require('boom');

const praseToken = (token) => new Promise(
  (reslove, reject) => {
    jwt.verify(token, 'Wechat-math-server', function(err, decode) {
      if (err) {
        reject('Token解析失败');
      } else {
        reslove({
          username: decode.username,
          role: decode.role
        });
      }
    });
  }
);

module.exports = function(){
  return async (ctx, next) => {
    const { authorization } = ctx.headers;
    let res;
    ctx.logger.info('正在进行[权限验证]', authorization);
    try {
      res = await praseToken(authorization);
    } catch (error) {
      ctx.logger.error('错误![权限验证]:', error);
    }
    if (!res) {
      ctx.body = Boom.unauthorized('无效的Token');
    } else {
      ctx.logger.info('成功！[权限验证]', res);
      ctx.auth = res;
      await next();
    }
  };
};
