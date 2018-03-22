const path = require('path');

module.exports = {
  entry: './src/morpher.js',
  mode: 'development',
  watch: true,
  output: {
    filename: 'morpher.js',
    path: path.resolve(__dirname, 'build'),
    library: 'Morpher',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  }
}
