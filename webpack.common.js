const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FontminPlugin = require('fontmin-webpack');
const webpack = require('webpack');
const fs = require('fs');
const srcPath = fs.existsSync('./src') ? './src' : '.';

module.exports = {
  entry: {
    app: `${srcPath}/index.tsx`,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${srcPath}/assets/index.html`
    }),
    new FontminPlugin({
      autodetect: true, // automatically pull unicode characters from CSS
      glyphs: ['\uf077', '\uf110'],
    }),
    new webpack.ids.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
  ],
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource'
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(txt|xml)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  }
};
