'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const checkLogin = app.middleware.checkLogin();
  const checkNotLogin = app.middleware.checkNotLogin();

  router.get('/', controller.posts.index);

  router.get('/signUp', checkNotLogin, controller.signUp.index);

  router.post('/signUp', checkNotLogin, controller.signUp.submit);
};
