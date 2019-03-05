const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
      path: path.join(__dirname,'./dist'),
      filename: 'bundle.js',
  },
  watch: true,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'./img/[name].[ext]'
            },
          },
        ],
      },
      {
        test: /\.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'./[name].[ext]'
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
            interpolate: true
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: 'src/index.html',
      filename: 'game.html'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/components/monster/bodyParts_demo/*.png',
        to: 'img/bodyParts_demo/',
        flatten: true 
      },
      {
        from: 'src/components/hero/img/animateHero/*.png',
        to: 'img/animateHero/',
        flatten: true 
      },
      {
        from: 'src/components/load/img/game_bg/*.png',
        to: 'img/',
        flatten: true 
      },
      {
        from: 'src/components/load/sound',
        to: 'sound/',
        flatten: true 
      },
      {
        from: 'src/components/load/sound/music',
        to: 'sound/music/',
        flatten: true 
      },
      {
        from: 'src/landing/landing.html',
        to: 'index.html',
        flatten: true 
      },
      {
        from: 'src/landing/landingStyles.css',
        to: 'landingStyles.css',
        flatten: true 
      },
      {
        from: 'src/landing/screenshots',
        to: 'screenshots/',
        flatten: true 
      },
    ]),
  ]
}
