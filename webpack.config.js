const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  PUBLIC: path.resolve(__dirname, 'public')
}

const isDebug = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: path.join(paths.SRC, 'client.js'),
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: 'js/bundle.js',
    publicPath: '/assets'
  },
  resolve: {
    extensions: ['*', '.js', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.scss$/,
        include: paths.SRC,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          // fallback: 'style-loader',
          use: [
            { loader: 'style-loader'},
            {
              loader: 'css-loader',
              query: {
                localIdentName: '[hash:base64:5]',
                modules: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'src/styles')],
                outputStyle: 'compressed',
              }
            }
          ]
        }))

      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(isDebug),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'index.html'
    }),
  ],
  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 8080,
    stats: 'errors-only',
    inline: true,
    contentBase: 'public',
    disableHostCheck: true
  },

}
