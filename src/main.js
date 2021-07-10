// 依赖
import sourceMap from "source-map";
import loadSourceMapRaw from "./loadSourceMapRaw.js";
// 输入
const sourceMapFilePath = String(process.argv[2]);
const line = Number(process.argv[3]);
const column = Number(process.argv[4]);
// 执行
debugSourceMap(sourceMapFilePath, line, column);
// 导出
export default function debugSourceMap(sourceMapFilePath, line, column, callback) {
    loadSourceMapRaw(sourceMapFilePath, (sourceMapRaw) => {
        // 使用 sourceMap 库定位报错源码文件、位置、栈名称、行内容
        new sourceMap.SourceMapConsumer(sourceMapRaw).then((consumer) => {
            const sm = consumer.originalPositionFor({
                line, // JS 报错的行
                column // JS 报错的列
            });
            // 根据查到的 source，到源文件列表中查找索引位置
            const smIndex = consumer.sources.indexOf(sm.source);
            // 到源码列表中查到源代码
            const smContent = consumer.sourcesContent[smIndex];
            // 将源代码串按"行结束标记"拆分为数组形式
            const rawLines = smContent.split(/\r?\n/g);
            //  输出源码行，因为数组索引从 0 开始，故行数需要 -1
            sm.lineContent = rawLines[sm.line - 1];
            // 返回最终信息
            typeof callback === "function" && callback(sm);
            // 打印最终信息
            typeof callback === "undefined" && console.log(sm);
            // console.log(sm);
        });
    });
}
