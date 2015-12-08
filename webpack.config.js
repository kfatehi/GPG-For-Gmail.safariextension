var aspect = process.env.ASPECT
module.exports = {
  entry: {
    'build/global': './src/global/index',
    'build/inject': './src/inject/index',
  },
  output: {
    path: './',
    filename: '[name].js'
  },
  watch: true,
  cache: true,
  node: {
    fs: 'empty'
  }
}
