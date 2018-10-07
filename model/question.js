const mongoose = require('mongoose');
const transform = require('../util/transform');

const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Question',
  new Schema({
    type: { type: String, enum: ['subjective', 'objective'], default: 'objective' }, // 试题类型, 主观题和客观题(选择题)
    title: new Schema({ // 题目标题
      type: { type: String, enum: ['text', 'img'], required: true }, // 题目标题的类型，text为文字，img为图片的url地址
      content: { type: String, default: '' } // 标题的内容,根据type来决定
    }),
    choices: { type: [String], default: [] }, // 选择题的选项，如果为主观题，此字段为空
    answer: new Schema({
      type: { type: String, enum: ['text', 'img'], required: true },
      content: { type: String, default: '' }
    }), // 答案，可能是一段文字也可能是一张图片的url，如果为客观题，此字段为空
    standard: new Schema({
      type: { type: String, enum: ['text', 'img'], required: true },
      content: { type: String, default: '' }
    }), // 题目的标准答案，选择题是一个选项字符串，主观题是字符串或者是图片url
    tags: { type: [String], default: [] }, // 标签
  },{
    toObject: { transform },
    toJSON: { transform }
  })
);

/**
 * 示例数据
 * {
 *  type: 'objective',
 *  title: { type: 'text', content: '我是一道选择题' },
 *  choices: ['答案一', '答案二', '答案三', '答案四'],
 *  answer: { type: 'text', content: '答案二' }, 
 *  standard: { type: 'text', content: '答案三' },
 *  tags: ['测试题目']
 * }
 */
