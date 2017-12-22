import Webpack from 'webpack';
import Path from 'path';

const PATH = {
    ROOT: __dirname,
    SOURCE: Path.join(__dirname, './src'),
    TARGET: Path.join(__dirname, './dest')
};

const ENV = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
};

const NODE_ENV = process.env.NODE_ENV || ENV.DEVELOPMENT;

const Plugins = [
    new Webpack.NamedModulesPlugin(),
    new Webpack.optimize.CommonsChunkPlugin({async: true}),
    new Webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
    }),
    new Webpack.EnvironmentPlugin({
        NODE_ENV: NODE_ENV
    })
];

const Loaders = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    }, {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
    }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-decorators-legacy', 'transform-class-properties']
        }
    }
];


const WebpackConfig = {
    context: PATH.TARGET,
    node: {
        fs: 'empty' // avoids error messages
    },
    output: {
        filename: "./[name].js"
    },
    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: [
            PATH.SOURCE
        ]
    },
    devtool: 'inline-source-map',
    plugins: Plugins,
    module: {
        loaders: Loaders
    },
    stats: {
        children: false
    }
};

export default WebpackConfig;