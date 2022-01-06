const path = require('./paths');
const nodeExternals = require('webpack-node-externals');
const getCssModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const webpack = require('webpack');
const getClientEnvironment = require('./env');
const resolve = require("resolve");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss | sass)$/;
const sassModuleRegex = /\.module\.(scss | sass)$/;

const env = getClientEnvironment(path.publicUrlOrPath.slice(0,-1));

module.exports = {
    mode: 'production',
    entry: path.ssrIndexJs,
    target: 'node',
    output: {
        path: path.ssrBuild,
        filename: 'server.js',
        chunkFilename: 'js/[name].chunk.js',
        publicPath: path.publicUrlOrPath,
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: path.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve(
                                'babel-preset-react-app/webpack-overrides'
                            ),
                            presets: [
                                [
                                    require.resolve('babel-preset-react-app'),
                                    {
                                        runtime: 'automatic'
                                    },
                                ],
                            ],
                            plugins: [
                                [
                                    require.resolve('babel-plugin-named-asset-import'),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent:
                                                    '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                            },
                                        },
                                    },
                                ],
                            ],
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: false,
                        },
                    },
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: {
                                exportOnlyLocals: true
                            },
                        },
                    },
                    {
                        test: cssModuleRegex,
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: {
                                exportOnlyLocals: true,
                                getLocalIdent: getCssModuleLocalIdent,
                            },
                        },
                    },
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 3,
                                    modules: {
                                        exportOnlyLocals: true,
                                    },
                                },
                            },
                            require.resolve('sass-loader'),
                        ],
                    },
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 3,
                                    modules: {
                                        exportOnlyLocals: true,
                                        getLocalIdent: getCssModuleLocalIdent,
                                    },
                                },
                            },
                            require.resolve('sass-loader'),
                        ],
                    },
                    {
                        test: [/\.bmp$/,/\.gif$/,/\.jpe?g$/,/\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            emitFile: false,
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|mjs|jsx|ts|tsx)&/, /\.html$/,/\.json$/],
                        options: {
                            emitFile: false,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ],
                resolve: {
                    modules: ['node_modules'],
                },
                externals: [nodeExternals({
                    allowlist: [/@babel/],
                })]
            },
        ],
    },
};