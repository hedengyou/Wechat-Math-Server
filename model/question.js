const mongoose = require('mongoose');
const transform = require('../util/transform');

const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Question',
  new Schema({
    type: { type: String, default: '' }, // 试题类型
    title: { type: String, default: '' }, // 试题题目或描述
    choices: { type: [String], default: [] }, // 选择题的选项
    answer: { type: Schema.Types.Mixed }, // 主观题的答案，可能是一段文字也可能是一张图片的url
    standard: { type: Schema.Types.Mixed }, // 题目的标准答案，选择题是一个选项字符串，主观题是字符串或者是图片url
    tags: { type: [String], default: [] }, // 标签
  },{
    toObject: { transform },
    toJSON: { transform }
  })
);
