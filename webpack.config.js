const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
        event: "./src/event.js",
        sort: "./src/sort.js",
        todo: "./src/todo.js",
        addEventModal: "./src/addEventModal.js",
    },
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
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
    optimization: {
        runtimeChunk: "single",
    },
};
