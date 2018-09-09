const mongoose = require('mongoose');
const transform = require('../util/transform');

module.exports = mongoose.model(
  'User',
  new mongoose.Schema({
    name: { type: String, default: '' }, // 姓名
    roleId: { type: String, default: '' }, // 如果是学生就是学号，如果是教师就是工号或者分配的管理员账号
    update: { type: Date, default: Date.now }, // 更新时间
    email: { type: String, default: 'default@test.com' }, // 邮箱
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' }, // 角色，三个值: 'student', 'teacher', 'admin'
  },{
    toObject: { transform },
    toJSON: { transform }
  })
);
