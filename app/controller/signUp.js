/**
 * Created by heweiguang on 2018/8/2.
 */

const Controller = require('egg').Controller;

class SignUpController extends Controller {
  async index() {

    await this.ctx.render('signUp');
  }

  async submit() {
    const stream = await this.ctx.getFileStream();
    console.log(stream);
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


  }
}

module.exports = SignUpController;
