/**
 * 断言库
 * assert.equal()
 * assert.notEqual()
 * assert.deepEqual()
 * assert.notDeepEqual()
 * assert.rejects(asyncFn[, error][, message])
 * assert.doesNotReject(asyncFn[, error][, message])
 */

 import debugSourceMap from "../src/main.js";
// import debugSourceMap from "./../dist/debug-sm.esm.js";
import assert from "assert";
import { success, failure } from "./log.js";

// # 远程 HTTP 文件
// node debug.js http://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map 1 1000

const tracker = new assert.CallTracker();

function test1() {
    const link = "http://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map";
    const line = 1;
    const column = 1000;
    const callback = (data) => {
        assert.ok(!!data.source);
        success("debugSourceMap 远程 HTTP SourceMap 文件");
    };
    const callsfunc = tracker.calls(callback, 1);
    debugSourceMap(link, line, column, callsfunc);
}

function test2() {
    const link = "https://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map";
    const line = 1;
    const column = 1000;
    const callback = (data) => {
        assert.ok(!!data.source);
        success("debugSourceMap 远程 HTTPS SourceMap 文件");
    };
    const callsfunc = tracker.calls(callback, 1);
    debugSourceMap(link, line, column, callsfunc);
}

function test3() {
    const link = "./test/test.js.map";
    const line = 1;
    const column = 1000;
    const callback = (data) => {
        assert.ok(!!data.source);
        success("debugSourceMap 本地 SourceMap 文件");
    };
    const callsfunc = tracker.calls(callback, 1);
    debugSourceMap(link, line, column, callsfunc);
}

// 调用 tracker.verify() 并验证是否所有 tracker.calls() 函数都已被准确调用。
test1();
test2();
test3();
process.on("exit", () => {
    tracker.verify();
});
