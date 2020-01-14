/**
 * Webpack config
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const DIST_DIR = __dirname + '/public';

const extractSass = new ExtractTextPlugin({
    filename: 'css/app.css'
});

/*
const copyFiles = new CopyPlugin([
    { from: './resources/js/components', to: 'js/scripts' }
]);
*/

function sassRules () {
    return [
        {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract(
            {
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }
    ]
}

function scriptRules () {
    return [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }
    ]
}

module.exports = {
    entry: [
        '@babel/polyfill',
        './resources/assets/sass/components.scss',
        './resources/assets/sass/style.scss',
        './resources/js/app.js'
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: DIST_DIR,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: sassRules().concat(scriptRules())
    },
    plugins: [
        extractSass,
        // copyFiles
    ]
}