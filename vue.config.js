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
    ],
    optimization: {
     
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
  }
})
