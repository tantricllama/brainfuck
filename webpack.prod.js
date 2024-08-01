const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge.merge(common, {
  mode: 'production',
  resolve: {
    alias: {
      '@web': path.resolve(__dirname)
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: '/app/web/tsconfig.prod.json' 
          }
        },
        exclude: [/node_modules/, /\.spec\./],
      }
    ]
  }
});
