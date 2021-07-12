/**
 * 时间 2021-07-11 12:48:53
 * 作者 chenhu.pei
 */

// 允许 required/imported node 内置对象。
// 这样做可以提供适当的垫片来支持为 Browserify 设计的模块，
// 有些模块需要 "rollup-plugin-node-globals"。
import builtins from "rollup-plugin-node-builtins";
// 插入 node globals 的插件
// 包括使用 browserify 的代码
// 即使它使用 process or buffers 也应该可以工作
// 基于 rollup-plugin-inject 插件实现的。
import globals from "rollup-plugin-node-globals";
import nodePolyfills from "rollup-plugin-node-polyfills";
// 一个使用 node 解析算法定位模块的 Rollup 插件
import resolve from "@rollup/plugin-node-resolve";
// 将 CommonJS 模块转换为 ES6 的 Rollup 插件
import commonjs from "@rollup/plugin-commonjs";
// 用于压缩生成的 ES-Bundle 的 Rollup 插件，
// import { terser } from "rollup-plugin-terser";
// 项目配置
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript";

// 依赖包
const pkg_inside = ["fs", "path", "http", "https"];
const pkg_external = ["source-map"];
// 规范包
const bundle = {
    umd: {
        // 全平台规范包
        format: "umd",
        file: pkg.umd,
        name: "debugSourceMap"
    },
    iife: {
        // 浏览器平台规范包
        format: "iife",
        file: pkg.iife,
        name: "debugSourceMap"
    },
    cjs: {
        // Node 平台规范包
        format: "cjs",
        file: pkg.cjs,
        banner: "#!/usr/bin/env node",
        external: pkg_external
    },
    esm: {
        // NodeESM 平台规范包
        format: "es",
        file: pkg.esm
    }
};
// 导出构建配置
export default [
    // {
    //     input: "src/main.js",
    //     plugins: [
    //         builtins(),
    //         globals(),
    //         resolve(), // 用于支持查找 "source-map" 依赖包
    //         commonjs(), // 用于 "source-map" 依赖包转换成 ESM
    //         nodePolyfills()
    //     ],
    //     output: [
    //         // 输出规范包
    //         bundle.iife,
    //         bundle.umd
    //     ]
    // },
    {
        input: "src/main.ts",
        external: pkg_external,
        plugins: [typescript()],
        output: [
            // 输出规范包
            bundle.cjs,
            bundle.esm
        ]
    }
];
