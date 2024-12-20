const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack")
const dotEnv = require("./env/dot-env");

const PUBLIC_PATH = '/';

module.exports = () => {
  return {
    mode: process.env.NODE_ENV,
    entry: {
      main: './src/main.tsx',
      "service-worker": './src/serviceworker/service.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build/'),
      publicPath: PUBLIC_PATH
    },
    devServer: {
      port: '9000',
      historyApiFallback: true,
      host: '0.0.0.0' // host for auto open in browser
    },
    module: {
      rules: [
        {
          test: /(src|config|env).*\.tsx?$/,
          use: [
            {
              loader: 'ts-loader', // for tsx transpile to es5 modules
              options: {
                reportFiles: ['src/**/*.{ts,tsx}', 'config/**/*.{ts,tsx}']
              }
            }
          ],
          exclude: /node_modules/
        }, {
          test: /public\/assets.*\.png?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '/public/assets/',
                outputPath: 'public/assets/'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, './'), 'node_modules'],
      extensions: ['.ts', '.tsx','.js', '.jsx']
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './index.html'
      }),
      new webpack.DefinePlugin({
        envConfig: JSON.stringify(dotEnv.getEnvConfig(process.env.NODE_ENV))
      })
    ]
  }
}