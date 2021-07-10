//一个使用节点解析算法定位模块的 Rollup 插件，
// import resolve from "@rollup/plugin-node-resolve";
// 将 CommonJS 模块转换为 ES6 的 Rollup 插件，
import commonjs from "@rollup/plugin-commonjs";
// 用于压缩生成的 ES-Bundle 的 Rollup 插件，
// import { terser } from "rollup-plugin-terser";
// 项目配置
import pkg from "./package.json";
// 导出构建配置
export default [
    // browser-friendly UMD build
    // {
    //     input: "src/main.js",
    //     output: [
    //         {
    //             // 不存在 node 依赖时可用
    //             name: "debugSourceMap",
    //             file: pkg.iife,
    //             format: "iife"
    //         },
    //         {
    //             name: "debugSourceMap",
    //             file: pkg.browser,
    //             format: "umd"
    //         }
    //     ],
    //     plugins: [
    //         terser(),
    //         resolve(), // so Rollup can find `ms`
    //         commonjs() // so Rollup can convert `ms` to an ES module
    //     ]
    // },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: "src/main.js",
        external: ["source-map", "fs", "path", "http", "https"],
        plugins: [
            // terser(),
            // resolve(),
            // commonjs()
        ],
        output: [
            { file: pkg.commonjs, format: "cjs" },
            { file: pkg.module, format: "es" }
        ]
    }
];
