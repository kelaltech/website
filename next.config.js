const dotenvLoad = require('dotenv-load')
const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')

const withPlugins = require('next-compose-plugins')

const env = require('next-env')
const css = require('@zeit/next-css')
const sass = require('@zeit/next-sass')
const fonts = require('next-fonts')
const optimizedImages = require('next-optimized-images')
const images = require('next-images')
const offline = require('next-offline')
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

dotenvLoad()

const nextConfig = {
  target: 'serverless',

  webpack: (config, { dev }) => {
    if (!dev) {
      // css minification & optimization
      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}))

      // chuck count
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
      )

      // gzip compression
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|html|json|svg|webp|png|jpg|jpeg|gif|tiff)$/,
          deleteOriginalAssets: false
        })
      )

      // brotli compression
      config.plugins.push(
        new BrotliPlugin({
          asset: '[path].br[query]',
          test: /\.(js|css|html|json|svg|webp|png|jpg|jpeg|gif|tiff)$/,
          deleteOriginalAssets: false
        })
      )
    }

    return config
  }
}

module.exports = withPlugins(
  [
    // next-env
    env({
      staticPrefix: 'REACT_APP_'
    }),

    // @zeit/next-css
    css,

    // @zeit/next-sass
    sass,

    // next-images
    [images, {}],

    // next-optimized-images
    [
      optimizedImages,
      {
        handleImages: ['jpeg', 'png', 'webp', 'gif', 'ico'],
        optimizeImages: true,
        optimizeImagesInDev: true,
        mozjpeg: {
          quality: 80
        },
        optipng: false,
        pngquant: {
          speed: 7,
          quality: [0.65, 0.8]
        },
        gifsicle: {
          interlaced: true,
          optimizationLevel: 3
        },
        svgo: false,
        imageTrace: {
          threshold: 200
        }
      }
    ],

    // next-fonts
    fonts,

    // next-offline
    [
      offline,
      {
        workboxOpts: {
          swDest: 'static/service-worker.js',
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: 'CacheFirst'
            },
            {
              urlPattern: /(\/service-worker.js$)|(\/api\/)/,
              handler: 'NetworkFirst'
            }
          ]
        }
      }
    ],

    // @next/bundle-analyzer
    bundleAnalyzer
  ],
  nextConfig
)
