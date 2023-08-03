const { defineConfig } = require("@vue/cli-service");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const path = require("path");

const smp = new SpeedMeasurePlugin();
const terserPlugin = new TerserWebpackPlugin({
  parallel: 4,
  extractComments: true,
  terserOptions: {
    compress: {
      warnings: false,
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ["console.log"], // 移除console
    },
  },
});

module.exports = defineConfig({
  configureWebpack: smp.wrap({
    plugins: [new BundleAnalyzerPlugin()],
    optimization: {
      usedExports: true, // 只导出被使用的模块 tree-shaking
      concatenateModules: true, // 普通打包只是将一个模块最终放到一个单独的立即执行函数中，如果你有很多模块，那么就有很多立即执行函数。concatenateModules 可以要所有的模块都合并到一个函数里面去。
      minimize: true, // 启动压缩
      minimizer: [
        // 只有打包环境为 production 时才能生效
        terserPlugin,
      ],
      splitChunks: {
        chunks: "all",
        minSize: 25600, // 提取出的chunk的最小大小
        cacheGroups: {
          default: {
            name: "common",
            chunks: "initial",
            priority: -20,
            reuseExistingChunk: true,
          },
          vendors: {
            // 拆分第三方库（通过npm|yarn安装的库）
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial",
            priority: -10,
            reuseExistingChunk: true,
          },
          ant: {
            // 拆分指定文件
            test: /[\\/]node_modules[\\/](@ant-design)[\\/]/,
            name: "ant",
            chunks: "initial",
            priority: -8,
          },
          "ant-vue": {
            test: /[\\/]node_modules[\\/](ant-design-vue)[\\/]/,
            name: "ant-vue",
            chunks: "initial",
            priority: -8,
          },
          moment: {
            test: /[\\/]node_modules[\\/](moment)[\\/]/,
            name: "moment",
            chunks: "initial",
            priority: -7,
          },
          echarts: {
            test: /[\\/]node_modules[\\/](echarts)[\\/]/,
            name: "echarts",
            chunks: "initial",
            priority: -6,
          },
          lodash: {
            test: /[\\/]node_modules[\\/](lodash)[\\/]/,
            name: "lodash",
            chunks: "initial",
            priority: -5,
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src"),
        extensions: [".vue", ".js", ".json", "css", ".png"],
      },
    },
  }),
});
