const path = require("path");

module.exports = {
    entry : ["babel-polyfill","./src/script.js"],
    output : {
        filename : "bundle.js"
    },
    devServer : {
        static : "./dist",
        open : true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }
        ]
    }
}