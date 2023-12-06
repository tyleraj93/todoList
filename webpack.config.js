const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
        event: "./src/event.js",
        sort: "./src/sort.js",
        todo: "./src/todo.js",
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: "Todo List",
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    optimization: {
        runtimeChunk: "single",
    },
};