const mongoose = require('mongoose');
const transform = require('../util/transform');

const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Class',
  new Schema({
    name: { type: String, default: '' }, // 班级名
    teacher: { type: Schema.Types.ObjectId, ref: 'User' }, // 该班级的老师，一个班级只有一个老师
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }], // 该班级的所有学生
  },{
    toObject: { transform },
    toJSON: { transform }
  })
);
