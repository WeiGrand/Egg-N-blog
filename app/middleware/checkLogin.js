/**
 * Created by heweiguang on 2018/8/2.
 */

module.exports = () => {
  return async function checkLogin(ctx, next) {
    if (!ctx.session.user) {
      ctx.redirect('/signIn');
    }

    await next(); // 中间件的 next 也需要 await
  }
}
