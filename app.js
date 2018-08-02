/**
 * Created by heweiguang on 2018/8/2.
 */

const pkg = require('./package.json');

module.exports = app => {
  // 全局变量
  app.locals.blog = {
    title: pkg.name,
    description: pkg.description
  }
}
