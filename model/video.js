const mongoose = require('mongoose');
const transform = require('../util/transform');

const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Video',
  new Schema({
    name: { type: String, default: '' }, // 课程名
    path: { type: String, default: '' }, // 存储路径
  },{
    toObject: { transform },
    toJSON: { transform }
  })
);
