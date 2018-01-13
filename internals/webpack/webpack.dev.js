const path = require('path')
const webpack = require('webpack')
// const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = require('./webpack.base')({
  devServer: {
    publicPath: '/build/',
    contentBase: path.join(process.cwd(), 'public'),
    compress: true,
    port: 9000,
    historyApiFallback: true
  },

  entry: [
    './app.js'
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(process.cwd(), 'build')
  },

  // Add development plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new webpack.NoEmitOnErrorsPlugin(),
    // new CircularDependencyPlugin({
    //   exclude: /a\.js|node_modules/, // exclude node_modules
    //   failOnError: false // show a warning when there is a circular dependency
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true
    })
  ],

  // Tell babel that we want to hot-reload
  babelQuery: {
    // require.resolve solves the issue of relative presets when dealing with
    // locally linked packages. This is an issue with babel and webpack.
    // See https://github.com/babel/babel-loader/issues/149 and
    // https://github.com/webpack/webpack/issues/1866
    presets: ['babel-preset-react-hmre'].map(require.resolve)
  },

  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map',

  performance: {
    hints: false
  }
})
