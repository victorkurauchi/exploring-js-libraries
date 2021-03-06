const path = require('path');
const webpack = require('webpack');
const mode = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test' ? 'development' : 'production';

const serverConfig = {
  target: 'node',
  mode: mode,
  entry: __dirname + '/src/index.js',
  devtool: 'inline-source-map',
  resolve: {
    extensions: [ '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: 'weather.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'weather',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  }
};

const clientConfig = {
  target: 'web',
  mode: mode,
  entry: __dirname + '/src/index.js',
  devtool: 'inline-source-map',
  resolve: {
    extensions: [ '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: 'weather.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Weather',
    libraryTarget: 'var'
  }
};

module.exports = [serverConfig, clientConfig];
