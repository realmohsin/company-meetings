const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: '3.4.7'
    }
  ],
  ['@babel/preset-react'],
  ['@emotion/babel-preset-css-prop']
]

const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties'
]

module.exports = { presets, plugins }
