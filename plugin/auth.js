const jwt = require('jsonwebtoken');
const Boom = require('boom');

const praseToken = (token) => new Promise(
  (reslove, reject) => {
    jwt.verify(token, 'Wechat-math-server', function(err, decode) {
      if (err) {
        reject();
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
    const { Authorization } = ctx.headers;
    let res;
    try {
      res = await praseToken(Authorization);
    } catch (error) {
      ctx.logger.error('错误![权限验证]:', error);
      ctx.body = Boom.unauthorized();
    }
    ctx.auth = res;
    await next();
  };
};
