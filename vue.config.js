const { defineConfig } = require('@vue/cli-service')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/hello-world/'
    : '/',
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  }
})
