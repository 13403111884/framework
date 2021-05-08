const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '^/client': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },

  css: {
    extract: process.env.NODE_ENV === 'production',
  },

  configureWebpack: () => ({ }),

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/util/axios.js'))
      .set('@store', resolve('src/store'))
      .set('@modules', resolve('src/modules'))
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        resolve('./src/assets/styles/varibles.styl')
      ]
    },
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      // analyzerPort: '9009'
    }
  },

  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js',
    }
  },
}
