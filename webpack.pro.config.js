var webpack = require('webpack');
var path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');

var APP_PATH = path.resolve(__dirname,'./js/app.js');
var BUILD_PATH = path.resolve(__dirname, 'build/static/js');
var COPY_PATH = path.resolve(__dirname,"build/static/images");

module.exports = {
  entry: {
    app: APP_PATH, 
    vendor: ['es5-shim','es5-shim/es5-sham','console-polyfill','react','react-dom','react-raphael'] 
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].min.js' //输出js
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([{from: 'images',to: COPY_PATH,toType: 'dir',force: true}]),
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename: 'vendor.min.js'}),
    new webpack.optimize.UglifyJsPlugin({ 
        minimize: true,
        compress:{
            warnings: false
        }
    })
 ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-2' ],
      exclude: /node_modules/
    },{
        test: /\.less$/,
        loaders: ['style-loader','css-loader','less-loader']
    }
    ]
  }
};
