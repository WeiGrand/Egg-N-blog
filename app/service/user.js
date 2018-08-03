/**
 * Created by heweiguang on 2018/8/3.
 */

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 创建新用户
   * @param userInfo
   * @returns {Promise<T | boolean>}
   */
  async create(userInfo) {
    const ctx = this.ctx;

    return await ctx.model.User.create(userInfo)
    .then(function (user) {
      return {
        success: true,
        data: user
      };
    }).catch(function (err) {
      return {
        success: false,
        message: err.message
      };
    });
  }

  async findOne(conditions) {
    const ctx = this.ctx;

    return await ctx.model.User.findOne(conditions)
      .then(user => user);
  }
}

module.exports = UserService;
