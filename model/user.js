const mongoose = require('mongoose');
const transform = require('../util/transform');

const UsersModel = mongoose.model(
  'User',
  new mongoose.Schema({
    name: { type: String, default: '' },
    password: { type: String, default: '' },
    tags: { type: Array, default: [] },
    update: { type: Date, default: Date.now },
    email: { type: String, default: 'default@test.com' }
  },{
    toObject: { transform },
    toJSON: { transform }
  })
);

module.exports = UsersModel;
