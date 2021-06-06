const path = require('path');

module.exports = {
    entry: './src/public/view/main.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            "@/public": path.resolve(__dirname, "src/public")
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
                test: /\.less$/,
                use: ["style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
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