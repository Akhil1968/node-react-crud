module.exports = {
  entry: './public/main.js',

  output: {
    path: './public/bundle',
    filename: 'bundle.js'
  },

  watch: true,
  /*
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3000
  }
  */

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
       test: /\.css$/,
       loader: "style-loader!css-loader"
      },
      {
       test: /\.png$/,
       loader: "url-loader?limit=100000"
      },
      {
       test: /\.jpg$/,
       loader: "file-loader"
      },
      {
       test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
       loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
       test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
       loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
       test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
       loader: 'file'
      },
      {
       test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
       loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
}
