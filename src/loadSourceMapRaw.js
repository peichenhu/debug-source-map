import fs from "fs";
import path from "path";
import http from "http";
import https from "https";
import { isURL, isURLHTTPS, isBrowser } from "./utils.js";

export default function loadSourceMapRaw(sourceMapFilePath, callback) {
    let sourceMapRaw = "";
    if (!isURL.test(sourceMapFilePath)) {
        // 读取本机 SourceMap 文件
        try {
            if (isBrowser) throw new Error("浏览器环境只能使用远程服务器文件 URL。");
            sourceMapRaw = fs.readFileSync(path.resolve(sourceMapFilePath), "utf8");
            callback(sourceMapRaw);
        } catch (e) {
            console.error(`读取本机 SourceMap 文件失败，原因: ${e.message}`);
        }
    } else {
        // 下载远程 SourceMap 文件
        const xhr = isURLHTTPS.test(sourceMapFilePath) ? https : http;
        xhr.get(sourceMapFilePath, (res) => {
            res.setEncoding("utf8");
            res.on("data", (chunk) => (sourceMapRaw += chunk));
            res.on("end", () => {
                try {
                    callback(sourceMapRaw);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on("error", (e) => {
            console.error(`下载远程 SourceMap 文件失败，原因: ${e.message}`);
        });
    }
}
