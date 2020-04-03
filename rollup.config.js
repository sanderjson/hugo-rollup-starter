import commonjs from "@rollup/plugin-commonjs";
import buble from "@rollup/plugin-buble";
import replace from "@rollup/plugin-replace";
// import serve from "rollup-plugin-serve";
// import livereload from "rollup-plugin-livereload";
// import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";

const production = process.env.NODE_ENV === "production" ? true : false;

export default {
  input: "./src/assets/main.js",
  output: {
    format: "umd",
    file: "./src/assets/bundle/bundle.js",
    // dir: "./src/assets/bundle/",
    // entryFileNames: '[name]-[hash].js',
    // chunkFileNames: '[name]-[hash].js',
  },
  watch: {
    clearScreen: false
  },
  plugins: [
    resolve(),
    commonjs(),
    buble({
      exclude: "node_modules/**"
    }),
    replace({
      exclude: "node_modules/**",
      ENV: JSON.stringify(process.env.NODE_ENV || "development")
    })
    // !production &&
    //   serve({
    //     open: true,
    //     openPage: "/",
    //     contentBase: "/dist",
    //     historyApiFallback: true,
    //     historyApiFallback: "/200.html",
    //     host: "localhost",
    //     port: 1123,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       foo: "bar"
    //     }
    //   }),
    // !production &&
    //   livereload({
    //     watch: "dist",
    //     verbose: true
    //   })
  ]
};
