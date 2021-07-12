//-----------------需要用node来执行这个文件--------------------------
// 依赖
import sourceMap from "source-map";
import loadSourceMapRaw from "./loadSourceMapRaw.js";
import { ifDebugInfo, ifOriginSource } from './interface';
// 输入
const sourceMapFilePath: string = String(process.argv[2]);
const line: number = Number(process.argv[3]);
const column: number = Number(process.argv[4]);
// 执行
sourceMapFilePath && line && debugSourceMap(sourceMapFilePath, line, column);
//
function debugSourceMap(sourceMapFilePath: string, line: number, column: number, callback?: Function): void {
    loadSourceMapRaw(sourceMapFilePath, (sourceMapRaw) => {
        // 使用 sourceMap 库定位报错源码文件、位置、栈名称、行内容
        new sourceMap.SourceMapConsumer(sourceMapRaw).then((consumer: any) => {
            const originSource: ifOriginSource = consumer.originalPositionFor({
                line, // JS 报错的行
                column // JS 报错的列
            });
            const debugInfo: ifDebugInfo = {
                debug_source: sourceMapFilePath,
                debug_line: line,
                debug_column: column,
                find_source: originSource.source,
                find_line: originSource.line,
                find_column: originSource.column,
                find_name: originSource.name,
                find_lineContent: null,
            };
            // 根据查到的 source，到源文件列表中查找索引位置
            const index: number = consumer.sources.indexOf(debugInfo.find_source);
            // 到源码列表中查到源代码
            const content: string = consumer.sourcesContent[index] || "";
            // 将源代码串按"行结束标记"拆分为数组形式
            const rawLines: string[] = content.split(/\r?\n/g);
            //  输出源码行，因为数组索引从 0 开始，故行数需要 -1
            debugInfo.find_lineContent = rawLines[debugInfo.find_line - 1] || null;
            // 返回最终信息
            typeof callback === "function" && callback(debugInfo);
            // 打印最终信息
            typeof callback === "undefined" && console.log(debugInfo);
        });
    });
}
// 导出
export default debugSourceMap;
