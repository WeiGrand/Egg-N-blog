/**
 * Created by heweiguang on 2018/8/4.
 */

const Service = require('egg').Service;

class PostService extends Service {
  async create(postInfo) {
    const ctx = this.ctx;

    return await ctx.model.Post.create(postInfo)
      .then(function () {
        return {
          success: true
        };
      }).catch(function ({ message }) {
        return {
          success: false,
          message
        }
    })
  }

  async findAll(conditions) {
    const ctx = this.ctx;

    return await ctx.model.Post.find(conditions)
      .populate({
        path: 'author',
        model: 'User'
      }).sort({
        _id: -1
      })
      .then(function (posts) {
        return posts;
      });
  }

  async findOne(conditions) {
    const ctx = this.ctx;

    return await ctx.model.Post.findOne(conditions)
      .populate({
        path: 'author',
        model: 'User'
      }).then(function (post) {
        return post;
      })
  }

  async addPv(conditions) {
    const ctx = this.ctx;

    return await ctx.model.Post.update(conditions, {
      $inc: {
        pv: 1
      }
    });

  }

  async findOneAndUpdate(conditions, update) {
    const ctx = this.ctx;

    return await ctx.model.Post.findOneAndUpdate(conditions, update)
      .then(() => {
        return {
          success: true
        }
      })
      .catch(({ message }) => {
        return {
          success: false,
          message
        }
      })
  }

  async findOneAndRemove(conditions) {
    const ctx = this.ctx;

    return await ctx.model.Post.findOneAndRemove(conditions)
      .then(() => {
        return {
          success: true
        }
      })
      .catch(({ message }) => {
        return {
          success: false,
          message
        }
      })
  }
}

module.exports = PostService;
