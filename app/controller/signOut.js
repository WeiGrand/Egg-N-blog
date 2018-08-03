/**
 * Created by heweiguang on 2018/8/3.
 */

const Controller = require('egg').Controller;

class SignOutController extends Controller {
  async index() {
    const ctx = this.ctx;

    ctx.session.user = null;

    ctx.flash = {
      success: '登出成功'
    }

    return this.ctx.redirect('/');
  }
}

module.exports = SignOutController;
