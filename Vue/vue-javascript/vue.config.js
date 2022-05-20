'use strict';
const IS_DEV = process.env.NODE_ENV === 'development';
module.exports = {
  publicPath: IS_DEV ? '/' : '/devTutorials/',
  runtimeCompiler: true,
  lintOnSave : false,
  devServer: {
    overlay: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
};
