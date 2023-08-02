const { defineConfig } = require('@vue/cli-service')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const TerserWebpackPlugin = require('terser-webpack-plugin')

const smp = new SpeedMeasurePlugin()
const terserPlugin = new TerserWebpackPlugin({
  parallel: 4,
  extractComments: true,
  terserOptions: {
    compress: {
      warnings: false,
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log'] // 移除console
    }
  }
})

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/hello-world/'
    : '/',
  configureWebpack: smp.wrap({
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    optimization: {
      minimizer: [
        // 只有打包环境为 production 时才能生效
        terserPlugin
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 25600,  // 提取出的chunk的最小大小
        cacheGroups: {
          default: {
            name: 'common',
            chunks: 'initial',
            priority: -20,
            reuseExistingChunk: true
          },
          vendors: {  // 拆分第三方库（通过npm|yarn安装的库）
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            priority: -10,
            reuseExistingChunk: true
          },
          ant: {  //拆分指定文件
            test: /[\\/]node_modules[\\/](ant-design-vue)[\\/]/,
            name: 'ant',
            chunks: 'initial',
            priority: -8
          },
          moment: {
            test: /[\\/]node_modules[\\/](moment)[\\/]/,
            name: 'moment',
            chunks: 'initial',
            priority: -7
          },
          echarts: {
            test: /[\\/]node_modules[\\/](echarts)[\\/]/,
            name: 'echarts',
            chunks: 'initial',
            priority: -6
          }
        }
      }
    }
  })
})
