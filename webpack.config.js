const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { Template } = require('webpack');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode,
    devtool: mode === 'development' ? 'eval' : false,
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: '[name][contenthash].js',
        assetModuleFilename: 'assets/[hash][ext][querry]',
    },
    resolve: {
        extensions: ['.js', 'jsx', 'ts', '.tsx'],
    },
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public')
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [{
                test: /\.[tj]sx?$/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                    }

                }
            },
            {
                test: /\.(sa|sc|c)ss?$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ['postcss-preset-env']
                        }
                    }
                }, 'sass-loader']
            },
        ]
    }


}