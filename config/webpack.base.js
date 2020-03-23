module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node-modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node-modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.less$/,
                exclude: /\.min\.css$/,
                loader: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[name]__[local]__[hash:base64:8]'
                            }
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
