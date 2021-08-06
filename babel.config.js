module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        [
            'component',
            {
                libraryName: 'vue-pawel-ui',
                styleLibrary: {
                    name: 'themes'
                },
                ext: '.scss'
            }
        ]
        // [
        //   'import',
        //   {
        //     libraryName: 'vue-pawel-ui',
        //     customStyleName: name => `vue-pawel-ui/lib/themes/${name}.scss`
        //   }
        // ]
    ]
}
