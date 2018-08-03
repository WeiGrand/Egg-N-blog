'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_egg-blog-keys';

  // add your config here
  // 这里配置的中间件都是全局的，也就是这里添加的在每次请求都会经过，如果只想针对单个路由生效，直接在 router.js 中使用
  config.middleware = [
    'flash',
    'locals'
  ];

  // 模版引擎
  config.view = {
    defaultViewEngine: 'handlebars',
    defaultExtension: '.hbs',
    mapping: {
      '.hbs': 'handlebars',
    },
  };

  config.mongoose = {
    client: {
      url: 'mongodb://localhost:27017/egg-blog',
      options: {},
    },
  };

  return config;
};
