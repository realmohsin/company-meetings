const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '_',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/
        }
      }
    },
    minimizer: [new TerserPlugin()]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              fallback: 'file-loader',
              name: '[name].[contenthash].[ext]'
            }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: 'src/assets/favicon.ico',
      minify: {
        removeAttributeQuotes: true,
        collapseWhiteSpace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    }),
    new CleanWebpackPlugin()
  ]
}
