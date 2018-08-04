/**
 * Created by heweiguang on 2018/8/3.
 */

const sha1 = require('sha1');
const Controller = require('egg').Controller;

class SignInController extends Controller {
  async index() {

    await this.ctx.render('signIn');
  }

  async submit() {
    const ctx = this.ctx;

    const {
      name,
      password
    } = ctx.request.body;

    let error = '';

    if (!name.length) {
      error = '请填写用户名';
    } else if (!password.length) {
      error = '请填写密码';
    }

    if (error !== '') {
      this.ctx.flash = {
        error
      };

      return ctx.redirect('/signIn');
    }

    let user = await ctx.service.user.findOne({
      name
    });

    if (!user) {
      this.ctx.flash = {
        error: '用户不存在'
      };

      return ctx.redirect('back');
    }

    if (sha1(password) !== user.password) {
      this.ctx.flash = {
        error: '用户名或密码错误'
      };

      return ctx.redirect('back');
    }

    this.ctx.flash = {
      success: '登录成功'
    };

    // mongoose 返回的并不是 plain JavaScript object 不能直接增加或删除属性
    // 使用 toObject 将其转化为 plain JavaScript object
    user = user.toObject();

    delete user.password;

    // 存一份中文
    user.genderString = ctx.helper.renderGender(user.gender);

    console.log(user);
    console.log(user.genderString);

    ctx.session.user = user;

    return ctx.redirect('/');
  }
}

module.exports = SignInController;
