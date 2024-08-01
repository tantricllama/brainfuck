const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge.merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    static: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    client: {
      overlay: {
        errors: false,
        warnings: false
      }
    }
  },
  resolve: {
    alias: {
      '@web': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /\.spec\./]
      }
    ]
  }
});