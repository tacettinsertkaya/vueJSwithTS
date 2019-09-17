const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // publicPath: './',

  chainWebpack: config => {
    config.resolve.alias.set('utils', resolve('src/cores/utils.js'))
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'root.jQuery': 'jquery',
        moment: 'moment'
      }),
      new CopyWebpackPlugin([
        {
          from: 'web.config',
          to: '.'
        }
      ])
    ],
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json']
    }
  },
  // 输出文件目录
  outputDir: process.env.VUE_APP_ENV + 'Build',

  css: {
    modules: false,
    // 是否使用css分离插件
    extract: true
  },
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: ''
}
