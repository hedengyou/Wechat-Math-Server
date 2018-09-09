const mongoose = require('mongoose');
const transform = require('../util/transform');

const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Homework',
  new Schema({
    name: { type: String, default: '' }, // 作业名
    score: { type: String, default: '' }, // 作业的分数，可以是数字也可以是简单的优良评价
    question: [{ type: Schema.Types.ObjectId, ref: 'Question' }], // 该作业下的所有试题，通过ObjectId和ref关联
  },{
    toObject: { transform },
    toJSON: { transform }
  })
);
