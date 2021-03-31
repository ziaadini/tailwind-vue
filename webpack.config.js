import CopyWebpackPlugin from "copy-webpack-plugin";
module.exports = {
  css: {
    sourceMap: true
  },
  baseUrl: "/",
  outputDir: "src/client/dist",
  lintOnSave: false,
  configureWebpack: {
    performance: {
      maxAssetSize: 500000
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: "src/components/tailwind/", to: "public" }
      ])
    ]
  },
  devServer: {
    proxy: {
      ".*": {
        target: `http://localhost:${process.env.PORT}`,
        ws: true
      }
    }
  },
  module: {
    rules: [
      // ... other rules omitted

      // this will apply to both plain `.scss` files
      // AND `<style lang="scss">` blocks in `.vue` files
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
  // plugin omitted
};
