const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "style.css",
})

module.exports = {
    entry: {
        app: './src/scripts/app.js',
        ytworker: './src/workers/yt.worker.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.(s*)css$/,
            use: extractSass.extract({
                use: [
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ],
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass
    ],
    devServer: {
        host: 'localhost',
        port: 8080,
        inline: true,
        contentBase: path.join(__dirname, "dist")
    },
    mode: 'development'
}