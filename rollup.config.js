// import our third party plugins
import typescript from "rollup-plugin-typescript2";
import VuePlugin from "rollup-plugin-vue";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json"; // import our package.json file to re-use the naming
import alias from "@rollup/plugin-alias";
import sass from "rollup-plugin-sass";
import css from 'rollup-plugin-css-only'
export default {
  // this is the file containing all our exported components/functions
  input: "src/index.ts",
  // this is an array of outputed formats
  output: [
    {
      file: pkg.module, // the name of our esm library
      format: "esm", // the format of choice
      sourcemap: true, // ask rollup to include sourcemaps
    },
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.unpkg,
      format: "umd",
      name: "MyLibraryName",
      sourcemap: true,
      globals: {
        vue: "Vue",
      },
    },
  ],
  // this is an array of the plugins that we are including
  plugins: [
    // VuePlugin({
    //   include: /.vue/
    // }),
    //       typescript({ entries: [{ find:/^@\/(.+)/, replacement: './$1' }] }),
    // tsPlugin(),
    // resolve(),
    // commonjs()
    alias({
      resolve: [".js", ".ts"],
      entries: [
        {
          find: "vue",
          replacement: "node_modules/vue/dist/vue.runtime.esm-browser.js",
        },
      ],
    }),
    // postcss({
    //   minimize: true,
    //   modules: true,
    //   use: {
    //     sass: null,
    //     stylus: null,
    //     less: { javascriptEnabled: true },
    //   },
    //   extract: true,
    // }),
    sass(),
    css(),
    resolve(),
    typescript(),
    VuePlugin({ preprocessStyles: true }),
  ],
  // ask rollup to not bundle Vue in the library
  external: ["vue"],
};
