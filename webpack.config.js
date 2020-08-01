const path = require("path");
const entryPath = "development";
const entryFile = "js/App.js";
module.exports = {
    entry: ["whatwg-fetch", `./${entryPath}/${entryFile}`],
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, `${entryPath}/build`),
    },
    devServer: {
        contentBase: path.join(__dirname, `${entryPath}`),
        publicPath: "/build/",
        compress: true,
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ],
    },
};