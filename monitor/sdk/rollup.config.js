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
  input: 'index.js',
  watch: {
    exclude: 'node_modules/**'
  },
  output: {
    file: isDev ? '../website/client/js/monitor/bundle.umd.js' : '../dist/bundle.umd.js',
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