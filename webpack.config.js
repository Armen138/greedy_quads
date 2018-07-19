module.exports = {
    entry: "./main.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devtool: "#source-map",
    devServer: {
        port: 3000
    }
};

