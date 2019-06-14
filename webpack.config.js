const path = require('path');

const app = {
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'assets/dist'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: '[path][name].[ext]'
                    }
                }]
            }
        ]
    }
};

module.exports = [app];