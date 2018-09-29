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
      name: { type: String, default: '' },
      subChapters: [new Schema({
        name: { type: String, default: '' },
        video: { type: Schema.Types.ObjectId, ref: 'Video' }
      })]
    })], // 章节
    // subChapter: [{ type: String, default: '' }], // 子章节名
    // video: { type: Schema.Types.ObjectId, ref: '' } // 每个子章节关联一个视频，通过ObjectId ref关联video实体
  },{
    toObject: { transform },
    toJSON: { transform }
  })
);
