import replace from "@rollup/plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/sw.js",
    output: {
      format: "es",
      dir: "build",
    },
    plugins: [
      replace({ "process.env.NODE_ENV": '"production"' }),
      resolve(),
      terser({ output: { comments: false } }),
    ],
  },
];
