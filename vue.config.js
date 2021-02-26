const webpack = require('webpack');
const path = require('path');


module.exports = {

  configureWebpack: {

    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl',
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {}
    }
  },

};

