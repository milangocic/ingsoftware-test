const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname,'dist/js'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use:{loader: 'handlebars-loader'}
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist/js']),
        //new UglifyJsPlugin()

    ]
}