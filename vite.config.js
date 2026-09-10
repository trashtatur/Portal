const path = require('path');
const {defineConfig} = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
    plugins: [react({
        babel: {
            plugins: [
                ['@babel/plugin-proposal-decorators', {legacy: true}],
                ['@babel/plugin-transform-class-properties', {loose: true}]
            ]
        }
    })],
    resolve: {
        alias: {
            '@/public': path.resolve(__dirname, 'src/public')
        }
    },
    css: {
        modules: {
            scopeBehaviour: 'local',
            generateScopedName: '[name]__[local]--[hash:base64:5]'
        }
    },
    server: {
        fs: {
            allow: [path.resolve(__dirname)]
        },
        proxy: {
            '/V1': 'http://localhost:4004',
            '/images': 'http://localhost:4004'
        }
    },
    build: {
        outDir: path.resolve(__dirname, 'build'),
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            output: {
                entryFileNames: 'bundle.min.js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]'
            }
        }
    }
});
