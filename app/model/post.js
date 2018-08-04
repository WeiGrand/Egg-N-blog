/**
 * Created by heweiguang on 2018/8/4.
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PostSchema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    pv: {
      type: Number,
      default: 0
    }
  }, {
    timestamps: { // 设置 timestamps mongoose 会插入 `createdAt`，`updatedAt` 两个 fields，还可以指定 field name
      createdAt: 'created_at', // 为 `createdAt`
      updatedAt: 'updated_at'
    }
  });

  return mongoose.model('Post', PostSchema);
}
