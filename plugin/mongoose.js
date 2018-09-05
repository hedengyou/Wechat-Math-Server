const mongoose = require('mongoose');

module.exports = function(config){
  return async (ctx, next) => {
    mongoose.connect(config.url);
    mongoose.Promise = global.Promise;
    await next();
  };
};
