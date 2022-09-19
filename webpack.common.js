const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'assets/bundle.[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      '@base': path.resolve(__dirname, './src/base'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@local': path.resolve(__dirname, './src/local'),
      '@config': path.resolve(__dirname, './src/config'),
      '@api': path.resolve(__dirname, './src/api'),
      '@state': path.resolve(__dirname, './src/state'),
      '@context': path.resolve(__dirname, './src/state'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]',
                // localIdentName: 'ia_[sha1:hash:hex:5]'
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new StylelintPlugin({
      syntax: 'scss',
      emitError: true,
      lintDirtyModulesOnly: true,
    }),
    new ESLintPlugin({
      extensions: ['.jsx', '.js', '.json'],
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles.[name].[hash].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
  ],
}
