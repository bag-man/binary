const path = require('path')
const JavaScriptObfuscator = require('webpack-obfuscator')
const TerserPlugin = require('terser-webpack-plugin')

const obfuscatorOptions =  {
  rotateUnicodeArray: true,
  stringArrayEncoding: 'rc4',
  target: 'node',
  unicodeEscapeSequence: true,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: true,
  rotateStringArray: true,
  transformObjectKeys: true,
  seed: 28651296049594
}

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  target: 'node',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
      new JavaScriptObfuscator (obfuscatorOptions, []),
  ],
  node: false
}

