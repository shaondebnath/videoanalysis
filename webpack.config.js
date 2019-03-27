const path = require('path');

var xrTensorFlow = {
    entry: './xrTensor.js',
    output: {
        filename: 'xrTensor-bundle.js',
        path: path.resolve(__dirname, 'public'),
        sourceMapFilename: "xrTensor-bundle.map",
        libraryTarget: 'var',
        library: 'XRTensor'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "./"),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
};

module.exports = [xrTensorFlow]
