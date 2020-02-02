const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = {
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: "disabled"
        // generateStatsFile: true
      })
    ]
  },
  pwa: {
    name: "WeGive",
    short_name: "WeGive",
    description: "Sharing app for communities",
    lang: "en",
    start_url: "/",
    display: "standalone",
    theme_color: "#20c997",
    background_color: "#fff",
    gcm_sender_id: "568651074322",
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "./src/service-worker.js",
      swDest: "service-worker.js",
      exclude: [/_redirects/, /\.css.map$/]
    }
  }
};
