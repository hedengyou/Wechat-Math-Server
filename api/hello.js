const hello = {
  getHello: async (ctx) => {
    ctx.body = 'hello wolrd';
  },
};

module.exports = hello;