const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: '3.0.1',
      debug: true
    }
  ],
  ['@babel/preset-react'],
  ['@emotion/babel-preset-css-prop']
]

const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  'react-hot-loader/babel'
]

module.exports = { presets, plugins }
