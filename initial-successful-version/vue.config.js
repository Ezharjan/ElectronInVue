module.exports = {
    pluginOptions: {
        electronBuilder: {
            // preload: 'src/preload.js',
            preload: 'src/preload.ts',
            // Or, for multiple preload files:
            // preload: { preload: 'src/preload.js', otherPreload: 'src/preload2.js' }
            // preload: { preload: 'src/preload.js' }
            preload: { preload: 'src/preload.ts' }
        }
    }
}