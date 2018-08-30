const { resolve, join } = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        include: resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: ['awesome-typescript-loader'],
      },
    ],
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.tsx', '.ts', '.json'],
    alias: {
      '@app': join(__dirname, './src/views/app'),
      '@defaults': join(__dirname, './src/views/defaults'),
      '@mixins': join(__dirname, './src/views/mixins'),
      '@components': join(__dirname, './src/views/components'),
      '~': join(__dirname, './src'),
    },
  },
};
