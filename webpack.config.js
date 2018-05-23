require('dotenv').config()
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin
const GitRevisionPlugin = require('git-revision-webpack-plugin')

const PROJECT_ROOT = path.resolve(__dirname)
const devMode = process.env.NODE_ENV !== 'production'
const resolve = (relativePath) => path.resolve(PROJECT_ROOT, relativePath)

const gitRevisionPlugin = new GitRevisionPlugin({
  branch: true
})

/** @type {webpack.Configuration} */
const commonConfig = {
  entry: {
    app: ['react-hot-loader/patch', resolve(`src/app/index.tsx`)]
  },

  output: {
    path: resolve(`dist/`),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsConfigPathsPlugin()]
  },

  module: {
    rules: [{
        /** typescript loader */
        test: /\.tsx?$/,
        use: [{
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              errorsAsWarning: true, // <- prevent code style error from interrupting compile,
            }
          }
        ]
      },
      {
        /** image loader */
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
      /** font loaders */
      ...[
        ['woff', 'application/font-woff'],
        ['woff2', 'application/font-woff2'],
        ['otf', 'font/opentype'],
        ['ttf', 'application/octet-stream'],
        ['eot', 'application/vnd.ms-fontobject'],
        ['svg', 'image/svg+xml']
      ].map(([ext, mimetype]) => ({
        test: new RegExp(`\\.${ext}$`),
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[ext]',
          limit: 10000,
          mimetype
        }
      }))
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(`src/app/index.html`),
      inject: true,
      minify: {
        collapseWhitespace: true
      },
      cache: false
    }),
    new webpack.DefinePlugin({
      __GITHASH__: JSON.stringify(gitRevisionPlugin.branch() + '/' + gitRevisionPlugin.commithash())
    })
  ]
}

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ]
}

const prodConfig = {
  mode: 'production',

  output: {
    filename: '[name].[chunkhash].js'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      __DEV__: false
    })
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-'
    }
  },

  devtool: false
}

module.exports = devMode ? merge(commonConfig, devConfig) : merge(commonConfig, prodConfig)