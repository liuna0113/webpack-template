var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    //这个里面可以配置loader
    module: {
        //这个数组里面,放的就是一些列的规划
        //遇到什么文件,应该用什么处理
        //文件类型和加载器(loader)进行对应的规划
        rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.sass$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg|bpm)$/,
                use: [{
                    //图片打包url-loader,会将图片转成base64格式的字符串
                    //但是经过测试我们发现,同一张图片的base64格式的内容和图片原来的大小相比,会增加将近1/3左右的体积
                    //所以,简易小图片可以使用这个东西进行打包,转成base64
                    //大图片,就不要转了,我们可以通过给这个loader传递参数告诉他图片大于多少就不转了
                    loader: "url-loader",
                    options: {
                        // 单位是b
                        limit: 1024 * 50
                    }
                }]
            },
            {
                test: "/\.(woff|woff2|eot|ttf)$/",
                use: ["url-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    devServer: {
        port: 9999,
        hot: true,
        contentBase: path.join(__dirname, "src")
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html")
        })
    ]

}