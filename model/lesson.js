const mongoose = require('mongoose');
const transform = require('../util/transform');

const Schema = mongoose.Schema;

module.exports= mongoose.model(
  'Lesson',
  new Schema({
    name: { type: String, default: '' }, // 课程名
    chapter: new Schema({
      name: { type: String, default: '' }, // 章节名
      subChapter: new Schema({
        name: { type: String, default: '' }, // 子章节名
        video: { type: Schema.Types.ObjectId, ref: '' } // 每个子章节关联一个视频，通过ObjectId ref关联video实体
      })
    })
  },{
    toObject: { transform },
    toJSON: { transform }
  })
);
