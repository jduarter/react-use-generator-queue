// https://github.com/rollup/rollup-plugin-commonjs/issues/290
// import * as react from 'react';

import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import cleanup from "rollup-plugin-cleanup";
import analyze from "rollup-plugin-analyzer";
import license from "rollup-plugin-license";
import strip from "@rollup/plugin-strip";

import commonjs from "@rollup/plugin-commonjs";

const path = require("path");

const LICENSE_CFG = {
  banner: {
    content: {
      file: path.join(__dirname, "LICENSE"),
    },
  },
};

const STRIP_CFG = {
  debugger: true,
  functions: ["console.*", "assert.*", "loggerForScope", "Log.*"],
};

export default [
  {
    input: "src/index.ts",
    output: [
      { file: "build/lib.debug.js", format: "cjs" },
      { file: "build/lib.esm.debug.js", format: "esm" },
    ],
    plugins: [
      typescript(),
      cleanup({ comments: "none" }),
      commonjs({}),
      nodeResolve(),
      license(LICENSE_CFG),
      analyze(),
    ],
  },
  {
    input: "src/index.ts",
    output: [
      { file: "build/lib.js", format: "cjs" },
      {
        file: "build/lib.min.js",
        format: "cjs",
        plugins: [terser()],
      },
      { file: "build/lib.js", format: "cjs" },
      { file: "build/lib.esm.js", format: "esm" },
    ],
    plugins: [
      typescript(),
      cleanup({ comments: "none" }),
      strip(STRIP_CFG),
      commonjs({}),
      nodeResolve(),
      license(LICENSE_CFG),
      analyze(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "build/lib.d.ts", format: "es" }],
    plugins: [
      dts(),
      cleanup({ comments: "none" }),
      license(LICENSE_CFG),
      analyze(),
    ],
  },
];
