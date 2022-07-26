const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: './',
    chainWebpack: (config) => {
        config.module.rule('md').test(/\.md/).use('vue-loader').loader('vue-loader').end().use('vue-markdown-loader').loader('vue-markdown-loader/lib/markdown-compiler').options({
            raw: true,
        })
    },
    pluginOptions: {
        electronBuilder: {
            externals: ['axios', 'core-js', 'nedb', 'qs', 'vue', 'vue-router', 'vuex'],
            outputDir: './elctron-builder',
            removeElectronJunk: false,
            builderOptions: {
                appId: 'AI表单助手',
                win: {
                    icon: './build/favicon.ico',
                    target: [
                        {
                            target: 'nsis',
                            arch: ['x64', 'ia32'],
                        },
                    ],
                },
                mac: {
                    appId: 'mac_AI',
                },
                linux: {
                    appId: 'linux_Ai',
                },
                productName: 'AI表单助手',
                nsis: {
                    oneClick: false,
                    allowElevation: true,
                    allowToChangeInstallationDirectory: true,
                    installerIcon: './build/favicon.ico',
                    uninstallerIcon: './build/favicon.ico',
                    installerHeaderIcon: './build/favicon.ico',
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true,
                },
            },
        },
    },
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },
})

