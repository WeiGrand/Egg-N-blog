/**
 * Created by heweiguang on 2018/8/3.
 */

module.exports = () => {
  return async function (ctx, next) {

    ctx.locals.user = ctx.session.user;
    ctx.locals.success = ctx.flash.success;
    ctx.locals.error = ctx.flash.error;

    await next();
  }
}
