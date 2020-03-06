import commonjs from "@rollup/plugin-commonjs";
import buble from "@rollup/plugin-buble";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";

const production = process.env.NODE_ENV === "production" ? true : false;

export default {
  input: "./src/assets/main.js",
  output: {
    file: "./src/assets/bundle/bundle.js",
    format: "umd"
  },
  watch: {
    clearScreen: false
  },
  plugins: [
    production &&
      postcss({
        extract: false,
        modules: true
      }),
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
