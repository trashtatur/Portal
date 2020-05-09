const path = require('path');

module.exports = {
    entry: './src/public/view/main.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /.(png|jpe?g|gif|svg|webp)$/,
                loader: 'url-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    }
                }],
            },
        ]
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    devtool : 'source-map'
};