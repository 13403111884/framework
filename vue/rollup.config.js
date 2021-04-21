import babel from 'rollup-plugin-babel'

let isDev = process.env.NODE_ENV === 'develop'
const babelConfig = {
  "presets": [
    [
      "env",
      {
        "modules": false,
        "targets": {
          "browsers": ["chrome > 40", "safari >= 7"]
        }
      }
    ]
  ]
}

export default {
  input: 'dom-diff/index.js',
  watch: {
    exclude: 'node_modules/**'
  },
  output: {
    file: './dist/domDiff.js',
    name: 'EagleMonitor',
    format: 'umd',
    sourcemap: true
  },
  plugin: [
    babel({
      babelrc: false,
      presets: babelConfig.presets,
      plugins: babelConfig.plugins,
      exclude: 'node_modules/**'
    })
  ]
}