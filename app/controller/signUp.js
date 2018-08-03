/**
 * Created by heweiguang on 2018/8/2.
 */

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');
const sha1 = require('sha1');

class SignUpController extends Controller {
  async index() {

    await this.ctx.render('signUp');
  }

  async submit() {
    const ctx = this.ctx;

    const stream = await ctx.getFileStreamWithoutFileNotFoundError();

    //FileStream {
    //   _readableState:
    //    ReadableState {
    //      objectMode: false,
    //      highWaterMark: 16384,
    //      buffer: BufferList { head: [Object], tail: [Object], length: 1 },
    //      length: 64212,
    //      pipes: null,
    //      pipesCount: 0,
    //      flowing: null,
    //      ended: false,
    //      endEmitted: false,
    //      reading: false,
    //      sync: true,
    //      needReadable: false,
    //      emittedReadable: false,
    //      readableListening: false,
    //      resumeScheduled: false,
    //      destroyed: false,
    //      defaultEncoding: 'utf8',
    //      awaitDrain: 0,
    //      readingMore: false,
    //      decoder: null,
    //      encoding: null },
    //   readable: true,
    //   domain: null,
    //   _events:
    //    { end: [Function],
    //      limit: { [Function: bound onceWrapper] listener: [Function] } },
    //   _eventsCount: 2,
    //   _maxListeners: undefined,
    //   truncated: false,
    //   _read: [Function],
    //   fieldname: 'avatar',
    //   filename: 'zzc_logo.jpg',
    //   encoding: '7bit',
    //   transferEncoding: '7bit',
    //   mime: 'image/jpeg',
    //   mimeType: 'image/jpeg',
    //   fields:
    //    { name: 'user1',
    //      password: '123123',
    //      repassword: '123123',
    //      gender: 'm' } }

    const {
      fields: {
        name,
        password,
        rePassword,
        gender,
        bio
      }
    } = stream;

    let error = '';

    if (!(name.length >= 1 && name.length <= 10)) {
      error = '名字请限制在 1-10 个字符';
    } else if (['m', 'f', 'x'].indexOf(gender) === -1) {
      error = '性别只能是 m、f 或 x';
    } else if (!(bio.length >= 1 && bio.length <= 300)) {
      error = '个人简介请限制在 1-30 个字符';
    } else if (!stream.filename) {
      error = '缺少头像';
    } else if (password.length < 6) {
      error = '密码至少 6 个字符';
    } else if (password !== rePassword) {
      error = '两次输入密码不一致';
    }

    if (error !== '') {
      this.ctx.flash = {
        error
      };

      return ctx.redirect('/signUp');
    }

    const filename = encodeURIComponent(name) + '_' + Date.now() + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/img', filename);
    const writeStream = fs.createWriteStream(target);

    const avatar = path.join('/public/img', filename);

    await pump(stream, writeStream);

    const res = await ctx.service.user.create({
      name,
      password: sha1(password),
      gender,
      bio,
      avatar
    });

    if (res['success']) {
      const {
        data
      } = res;

      delete data.password;

      ctx.session.user = data;

      ctx.flash = {
        success: '注册成功'
      }

      return ctx.redirect('/');
    } else {

      // 删掉上传了的头像
      fs.unlink(target);

      const {
        message
      } = res;

      if (message.match('duplicate key')) {
        ctx.flash = {
          error: '用户名已被占用'
        }
      }

      return ctx.redirect('/signUp');
    }
  }
}

module.exports = SignUpController;
