module.exports = {
  entry : './src/index.js',
  output : {
    path : './',
    filename : 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js$/,
        loader : 'babel-loader',
        query : {
          presets : ['stage-0','stage-1','es2015','react'],
          plugins : ["transform-class-properties"]
        }
      }
    ]
  },
  devServer:{
    inline : true,
    port : 8080
  }
}
