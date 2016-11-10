var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var APP_PATH = path.resolve(__dirname,'./js/app.js');
var BUILD_PATH = path.resolve(__dirname, './js');
var TMP_PATH = path.resolve(__dirname,'./templates/index.html');

module.exports = {
  entry: {
    app: APP_PATH, 
    vendor: ['es5-shim','es5-shim/es5-sham','console-polyfill','react','react-dom','raphael'] 
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js' //输出js
  },
  plugins: [
    new CopyWebpackPlugin([{from: 'images',to: 'static/images'}]),
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename: 'vendor.js'}),
    new webpack.optimize.UglifyJsPlugin({ 
        minimize: true,
        compress:{
            warnings: false,
            drop_debugger: true,
            drop_console: true
        }
    }), 
    new HtmlWebpackPlugin({
        title: '智汇学习',
        template: TMP_PATH,
        filename: 'index.html',
        chunks: ['app','vendor'],
        inject: 'body'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
      //browser: 'chromium-browser' // mac调试时需要注释该行
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0' ], // ie8调试时，去掉,presets[]=react-hmre
      exclude: /node_modules/
    },{
        test: /\.less$/,
        loaders: ['style','css','less']
    }
    ]
  }
};