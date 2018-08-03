/**
 * Created by heweiguang on 2018/8/3.
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: {
      type: String,
      unique: true, // 唯一索引
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['m', 'f', 'x'],
      default: 'x'
    },
    bio: {
      type: String,
      required: true
    }
  });

  return mongoose.model('User', UserSchema);
}
