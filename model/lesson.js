const mongoose = require('mongoose');
const transform = require('../util/transform');

const Schema = mongoose.Schema;

module.exports= mongoose.model(
  'Lesson',
  new Schema({
    name: { type: String, default: '' }, // 课程名
    description: { type: String, default: '' }, // 课程描述
    cover: { type: String, default: '' }, // 封面图
    chapters: [new Schema({
      name: { type: String, default: '' }, // 章节名
      subChapters: [new Schema({
        name: { type: String, default: '' }, // 子章节名
        video: { type: Schema.Types.ObjectId, ref: 'Video' }, // 该子章节关联的视频实体
        questions: [{ type: Schema.Types.ObjectId, ref: 'Question', require: false }] // 该子章节关联的试题实体数组
      })]
    })]
  },{
    toObject: { transform },
    toJSON: { transform }
  })
);
