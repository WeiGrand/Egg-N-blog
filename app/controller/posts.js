/**
 * Created by heweiguang on 2018/8/2.
 */

const Controller = require('egg').Controller;

class PostsController extends Controller {
  async index() {

    await this.ctx.render('posts');
  }
}

module.exports = PostsController;
