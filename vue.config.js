const registerRouter = require('./backend/router')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    before(app) {
      registerRouter(app)
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('components', resolve('src/components'))
      .set('base', resolve('src/base'))
  }
}
