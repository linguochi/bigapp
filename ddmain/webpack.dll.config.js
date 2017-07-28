const path = require('path');
const webpack = require('webpack');

let vArr = ['vue', 'vue-router', 'vue-resource', 'vuex', 'fastclick']

if (process.env.NODE_ENV === 'production') {

    module.exports = {
      entry: {
        vendor: vArr
      },
      output: {
        path: path.join(__dirname, './dist/'),
        filename: '[name]/vendor.dll.js',
        library: '[name]'
      },
      plugins: [
        new webpack.DllPlugin({
          path: path.join(__dirname, './dist/', '[name]/vendor-manifest.json'),
          name: '[name]'
        }),
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
        })
      ]
    };

} else {
   module.exports = {
     entry: {
       vendor: vArr
     },
     output: {
       path: path.join(__dirname, './dist/'),
       filename: '[name]/vendor.dll.dev.js',
       library: '[name]'
     },
     plugins: [
       new webpack.DllPlugin({
         path: path.join(__dirname, './dist/', '[name]/vendor-manifest-dev.json'),
         name: '[name]'
       })
     ]
   };
}