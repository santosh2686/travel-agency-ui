const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

const apiEndPoint = 'http://localhost:8080'

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: process.env.PORT || 4040,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    overlay: true,
    compress: true,
    hot: true,
    proxy: [{
      path: '/api/**',
      target: apiEndPoint,
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/',
      },
    }],
  },
}

module.exports = merge(commonConfig, devConfig)
