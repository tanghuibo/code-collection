module.exports = {
  publicPath: "",
  productionSourceMap: false,
  css: {
    extract: false
  },
  devServer: {
    proxy: {
      "/": {
        target: "http://127.0.0.1:8081"
      }
    }
  }
};
