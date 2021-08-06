const path = require('path')
const fs = require('fs')
const resolve = dir => path.resolve(__dirname, dir)

const getComponents = () => {
    const files = fs.readdirSync(resolve('packages')).filter(key => !['index.js', 'themes'].includes(key))
    return files.reduce((item, key) => ((item[key] = `./packages/${key}/index.js`) && item) || item, {})
}

const params = env => {
    if (env === 'production') {
        return {
            outputDir: resolve('vue-pawel-ui/lib'),
            configureWebpack: {
                entry: process.env.npm_config_disperse ? getComponents() : './packages/index.js',
                output: {
                    filename: process.env.npm_config_disperse ? '[name]/index.js' : 'index.js',
                    libraryTarget: 'umd',
                    libraryExport: 'default',
                    library: 'vue-pawel-ui'
                }
            },
            css: {
                // sourceMap: true,
                extract: {
                    filename: process.env.npm_config_disperse ? 'themes/[name].css' : 'themes/index.css'
                }
            },
            chainWebpack: config => {
                config.optimization.delete('splitChunks')
                // config.plugins.delete('copy')
                config.plugins.delete('preload')
                config.plugins.delete('prefetch')
                config.plugins.delete('html')
                config.entryPoints.delete('app')
                config.plugin('copy').tap(args => {
                    args[0][0].from = resolve('packages/themes')
                    args[0][0].to = resolve('vue-pawel-ui/lib/themes')
                    return args
                })
            }
        }
    } else {
        return {}
    }
}

module.exports = params(process.env.NODE_ENV)
