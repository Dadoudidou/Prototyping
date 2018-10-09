const webpack = require("webpack");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.resolve(__dirname, './../src');
const distPath = path.resolve(__dirname, './../dist');

//#region PRODUCTION DEVELOPMENT
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
else process.env.NODE_ENV = process.env.NODE_ENV.trim().toLowerCase();
const production = (process.env.NODE_ENV) ? process.env.NODE_ENV === 'production' : false;
//#endregion

var webpackConfig = {
    target: "web",
    context: srcPath,
    mode: process.env.NODE_ENV,
    node: { console: true, fs: 'empty', net: 'empty', tls: 'empty' },
    optimization:{
        minimize: production ? true : false,
    },
    devtool: !production ? 'inline-source-map' : 'source-map',
    resolve: {
        extensions: ["*", ".json", ".ts", ".tsx", ".js"],
        alias: { 
        },
        modules: [ "src", "node_modules" ],
        mainFields: ['browser', 'main', 'module'],
    },
    module: {
        rules:[
            // -- typescript
            {
                test: /.tsx?$/,
                exclude: [ /node_modules/ , path.resolve(srcPath, 'node_modules')],
                include: path.resolve(srcPath),
                use: [
                    { loader: 'ts-loader', options: { transpileOnly: true, configFile: "config/tsconfig.json" } }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: false,
        publicPath: false
    }
}

// --- name
webpackConfig.name = "Client";

// --- entry
webpackConfig.entry = {
    main: "index.tsx",
}

// --- output
webpackConfig.output = {
    path: distPath,
    filename: 'js/[name].js',
};

// --- optimization
webpackConfig.optimization = {
    minimize: false,
}
if (production) {
    webpackConfig.optimization.minimize = true;
}

// --- dev server
webpackConfig.devServer = {
    contentBase: distPath,
    port: 9000,
    stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: false,
        publicPath: false
    }
}

// --- index html
webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: 'index.html'
    })
)


// --- rules

// ------ sass css
const extractCss = new MiniCssExtractPlugin({
    filename: "css/[name].css",
    chunkFilename: "css/[name].css",
    disable: !production,
});
webpackConfig.module.rules.push({
    test: /\.s?css$/,
    use: [
        !production ? 'style-loader' : MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
    ]
})
webpackConfig.plugins.push(extractCss);

// ------ images
webpackConfig.module.rules.push({
    test: /\.(png|jpg|gif)$/,
    loader: 'file-loader',
    query: {
        name: "img/img-[name]-[hash:6].[ext]"
    }
});

// ------ fonts
webpackConfig.module.rules.push({
    test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader',
    query: {
        name: "fonts/[name].[ext]",
        publicPath: (!production) ? undefined : "../",
        limit: 10000
    }
});

module.exports = webpackConfig;