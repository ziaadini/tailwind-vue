// import our third party plugins
import commonjs from "@rollup/plugin-commonjs";
import tsPlugin from "@rollup/plugin-typescript";
import VuePlugin from "rollup-plugin-vue";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json"; // import our package.json file to re-use the naming

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
    VuePlugin({
      include: /.vue/,
    }),
    tsPlugin(),
    resolve(),
    commonjs(),
  ],
  // ask rollup to not bundle Vue in the library
  external: ["vue"],
};
