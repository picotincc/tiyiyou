"use strict";

const autoprefixer = require('autoprefixer');
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve("./src"),

    entry: {
        vendor: [ "babel-polyfill", "jquery"],
        activity: [ "./activity/index.js", "./activity/resource/index.less" ],
        report: [ "./report/index.js", "./report/resource/index.less" ],
    },

    output: {
        path: path.resolve("./public/assets"),
        publicPath: "/assets/",
        filename: "[name]/bundle.js"
    },

    resolve: {
        extensions: [ "", ".js", ".less" ]
    },

    devtool: "source-map",

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [ "babel" ],
                include: path.join(__dirname, 'src/')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=10000&name=images/[name].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },

    postcss: [ autoprefixer() ],

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoErrorsPlugin(),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
        }),

        new ExtractTextPlugin("./[name]/resource/bundle.css")
    ]

};
