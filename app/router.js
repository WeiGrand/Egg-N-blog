'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const checkLogin = app.middleware.checkLogin();
  const checkNotLogin = app.middleware.checkNotLogin();

  // 首页
  router.get('/', controller.posts.index);

  // 发表文章页
  router.get('/posts/create', checkLogin, controller.posts.createRender);

  // 发表文章接口
  router.post('/posts/create', checkLogin, controller.posts.createSubmit);

  // 特定文章页
  router.get('/posts/:postId', controller.posts.postRender);

  // 文章编辑页
  router.get('/posts/:postId/edit', checkLogin, controller.posts.editRender);

  // 文章编辑接口
  router.post('/posts/:postId/edit', checkLogin, controller.posts.editSubmit);

  // 删除文章
  router.get('/posts/:postId/remove', checkLogin, controller.posts.remove);

  // 注册页
  router.get('/signUp', checkNotLogin, controller.signUp.index);

  // 注册页接口
  router.post('/signUp', checkNotLogin, controller.signUp.submit);

  // 登录页
  router.get('/signIn', checkNotLogin, controller.signIn.index);

  // 登录页接口
  router.post('/signIn', checkNotLogin, controller.signIn.submit);

  // 登出
  router.get('/signOut', checkLogin, controller.signOut.index);
};
