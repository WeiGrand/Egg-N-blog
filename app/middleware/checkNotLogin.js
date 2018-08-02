/**
 * Created by heweiguang on 2018/8/2.
 */

module.exports = () => {
  return async function checkLogin(ctx, next) {
    if (ctx.session.user) {
      ctx.redirect('/'); // 外部重定向
    }

    await next();
  }
}
