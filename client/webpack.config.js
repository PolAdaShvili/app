const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = '/dist/build/';


module.exports = {
  entry: './src/index.js',
  mode: "development",
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React social app',
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.join(__dirname, publicPath),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map',
  },
  devServer: {
    port: 3000,
    host: 'localhost',
    clientLogLevel: 'info',
    proxy: {
      '/api': 'http://localhost:3001'
    },
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: publicPath,
    contentBase: path.join(__dirname, publicPath),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: "file-loader"
      },
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader']
      }]
  },
};
