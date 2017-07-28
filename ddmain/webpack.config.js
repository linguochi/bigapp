let path = require('path'),
    webpack = require('webpack'),
    glob = require('glob'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WebpackNotifierPlugin = require('webpack-notifier'),
    vuxLoader = require('vux-loader'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    ip = require('ip')

// 插件列表
let pluginsList = [
    new WebpackNotifierPlugin(),
    new webpack.ProvidePlugin({    // webpack的全局注入，在项目中少写点require
          Vue: ['vue', 'default'],
          VueRouter: ['vue-router', 'default'],
          VueResource: ['vue-resource', 'default'],
          Vuex: ['vuex', 'default'],

          FastClick: 'fastclick'
    })
]

//入口文件列表
// let newEntries = glob.sync('./src/views/pages/*/main.js')
// let entryArr = {}

// newEntries.forEach(function(f){
//    //得到apps/question/index这样的文件名
//    let tArr = f.split('/')
//    let name = tArr[tArr.length - 2]
//    entryArr[name] = f
// });


// 文件路径处理
let p_filename,
    p_manifest,
    p_devtoolTip

// 生成环境
if (process.env.NODE_ENV === 'production') {
      p_filename = 'dist/[name]/build.js?[chunkhash:8]'
      p_manifest = './dist/vendor/vendor-manifest.json'
      p_devtoolTip = false

      // 打包数据分析
      pluginsList.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'dist/report.html', 
            openAnalyzer: false
          })
      )
} else {
      p_filename = 'dist/[name]/build.js?[hash:8]'
      p_manifest = './dist/vendor/vendor-manifest-dev.json'
      p_devtoolTip = true
}

pluginsList.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks:2,
      filename: p_filename
    }),
    new webpack.DefinePlugin({
      devtoolTip: p_devtoolTip
    }),
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(p_manifest)
    })
)

pluginsList.push(
  new HtmlWebpackPlugin({
    title: '示例项目',
    env: process.env.NODE_ENV === 'production',
    filename: 'index.html',
    template: './src/tpl/tpl.html',
    hash: false,
    chunks: ['common', 'main']
  })
)

// dll加载
// let viewUrl = '',
//     chunksArr = [],
//     entryKeys = Object.keys(entryArr)

// // 页面生成
// entryKeys.map(function(key) {

//   chunksArr = ['common', key]
//   // 路径处理
//   key == 'index' ? viewUrl = 'index.html' : viewUrl = key + '/index.html'

//   pluginsList.push(
//     new HtmlWebpackPlugin({
//       title: '示例项目',
//       filename: viewUrl,
//       template: './src/tpl/tpl.html',
//       hash: false,
//       chunks: chunksArr
//     })
//   )
//   return key
// })

// 发布路径处理
const webpackConfig = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    filename: 'dist/[name]/build.js?[chunkhash:8]',
    chunkFilename: 'dist/[name].js?[chunkhash:8]'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // 'scss': 'vue-style-loader!css-loader!sass-loader',
            // 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'import-glob'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'static/[path][name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/[path]/[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: pluginsList,
  resolve: {
    alias: {
      // 'mstatic': resolve('public'),
      // 'vue$': 'vue/dist/vue.common.js',
      // 'vuex$': 'vuex/dist/vuex.js',
      // 'vue-router$': 'vue-router/dist/vue-router.common.js'
    },
    extensions: ['.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 5151,
    host: ip.address(),
    proxy: {
      // '/public': {
      //     target: 'http://shipper.di5cheng.org',
      //     host: 'shipper.di5cheng.org',
      //     changeOrigin: true,
      //     secure: false
      // }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    {
      name: 'vux-ui'
    },
    // {
    //   name: 'less-theme',
    //   path: 'src/common/style/theme.less'
    // }
  ]
})

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
