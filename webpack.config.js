const path = require('path');

const app = {
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'assets/dist'),
        filename: 'app.js',
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: [
                'html-loader'
            ]
        }]
    }
};

module.exports = [app];