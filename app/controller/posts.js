/**
 * Created by heweiguang on 2018/8/2.
 */

const marked = require('marked');
const Controller = require('egg').Controller;

class PostsController extends Controller {
  async index() {
    const ctx = this.ctx;

    const query = {};
    const { author } = ctx.request.query;

    if (author) {
      query.author = author;
    }

    const posts = await ctx.service.post.findAll(query);

    posts.forEach((post) => {
      const {
        content,
        author: {
          gender,
          _id
        }
      } = post;

      post.content = marked(content);
      post.author.gender = ctx.helper.renderGender(gender);
      post.isAdmin = ctx.session.user ? String(_id) === String(ctx.session.user._id) : false;
    });

    await ctx.render('posts', {
      posts
    });
  }

  async createRender() {
    const ctx = this.ctx;

    await ctx.render('create');
  }

  async createSubmit() {
    const ctx = this.ctx;

    const {
      title,
      content
    } = ctx.request.body;

    let error = '';

    if (!title.length) {
      error = '请填写标题';
    } else if (!content.length) {
      error = '请填写内容';
    }

    if (error !== '') {
      this.ctx.flash = {
        error
      };

      return ctx.redirect('/posts/create');
    }

    const res = await ctx.service.post.create({
      title,
      content,
      author: ctx.session.user._id
    });

    if (res['success']) {
      ctx.flash = {
        success: '发表成功'
      }

      return ctx.redirect('/');
    }

    ctx.flash = {
      error: res.message
    };

    return ctx.redirect('/posts/create');
  }

  async postRender() {
    const ctx = this.ctx;

    const { postId } = ctx.params;

    await ctx.service.post.addPv({
      _id: postId
    });

    const post = await ctx.service.post.findOne({
      _id: postId
    });

    post.content = marked(post.content);

    await ctx.render('post', {
      post
    });
  }

  async editRender() {
    const ctx = this.ctx;

    const { postId } = ctx.params;
    const author = ctx.session.user._id;

    const post = await ctx.service.post.findOne({
      _id: postId
    });

    if (!post) {
      ctx.flash = {
        error: '该文章不存在'
      };

      return ctx.redirect('/');
    }

    if (String(author) !== String(post.author._id)) {
      ctx.flash = {
        error: '权限不足'
      };

      return ctx.redirect('/');
    }

    await ctx.render('edit', {
      post
    });
  }

  async editSubmit() {
    const ctx = this.ctx;
    const { postId } = ctx.params;

    const {
      title,
      content
    } = ctx.request.body;

    let error = '';

    if (!title.length) {
      error = '请填写标题';
    } else if (!content.length) {
      error = '请填写内容';
    }

    if (error !== '') {
      ctx.flash = {
        error
      };

      return ctx.redirect(`/posts/${postId}/edit`);
    }

    const res = await ctx.service.post.findOneAndUpdate({
      _id: postId
    }, {
      title,
      content
    });

    if (res['success']) {
      ctx.flash = {
        success: '编辑文章成功'
      };

      return ctx.redirect(`/posts/${postId}`);
    }

    ctx.flash = {
      error: res['message']
    };

    return ctx.redirect(`/posts/${postId}/edit`);
  }

  async remove() {
    const ctx = this.ctx;
    const { postId } = ctx.params;

    const res = await ctx.service.post.findOneAndRemove({
      _id: postId
    });

    ctx.flash = res['success'] ? {
      success: '删除文章成功'
    } : {
      error: res['message']
    };

    return ctx.redirect('/');
  }
}

module.exports = PostsController;
