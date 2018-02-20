const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {'main': './src/main.js',
    'app': './src/app.js',
    'NavBar': './src/components/Navbar/NavBar.js'},
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name].js'
  },
  module: {

    rules: [
      /*
      your other rules for JavaScript transpiling go in here
      */
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'sass-loader?sourceMap'
          ]
        })
      },
      {
        // set up standard-loader as a preloader
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'standard-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          // Emit errors instead of warnings (default = false)
          error: false,
          // enable snazzy output (default = true)
          snazzy: true
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }

    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        beautify: false,
        ecma: 6,
        compress: true,
        comments: false
      }
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main']

    }),
    new HtmlWebpackPlugin({
      template: './src/components/NavBar/index.html',
      filename: 'app.html',
      chunks: ['app']
    })
  ]
}
