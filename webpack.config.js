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
    path: path.join(paths.PUBLIC, 'assets'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js', '.css']
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
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                localIdentName: '[hash:base64:5]',
                modules: true,
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'app/styles')],
                // outputStyle: 'compressed',
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
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    })
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
