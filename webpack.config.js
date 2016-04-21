/*eslint-env node */
const path = require('path'),
      merge = require('webpack-merge'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      htmlConfig = require(path.resolve('./app/mainpage.json'));

const TARGET = process.env.npm_lifecycle_event || 'build';

const common = {
    entry: path.resolve('./app/index.js'),
    output: {
        path: path.resolve('./build'),
        filename: 'bundle.[hash].js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    cacheDirectory: '.cache'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(htmlConfig),
        new CopyWebpackPlugin([
            {
                context: path.join(__dirname, 'app/components'),
                from: {glob: '**/*.html'},
                to: path.join(__dirname, 'build/templates')
            }
        ])
    ]
};

if (TARGET === 'start') {
    module.exports = merge(common, {
        devServer: {
            contentBase: path.resolve('./build/'),
            hot: true,
            outputPath: path.resolve('./build/')
        },
        devtool: 'eval-source-map'
    })
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        devtool: 'cheap-module-source-map',
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ]
    });
}