/**
 * 断言库
 * assert.equal()
 * assert.notEqual()
 * assert.deepEqual()
 * assert.notDeepEqual()
 * assert.rejects(asyncFn[, error][, message])
 * assert.doesNotReject(asyncFn[, error][, message])
 */

const assert = require("assert");
const { success, failure } = require("./log.js");
const debugSourceMap = require("..");

// # 远程 HTTP 文件
// node debug.js http://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map 1 1000

const tracker = new assert.CallTracker();

function test1() {
    const link = "http://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map";
    const line = 1;
    const column = 1000;
    const callback = (data) => {
        assert.ok(typeof data === "object");
        success("debugSourceMap 远程 HTTP SourceMap 文件：", data);
    };
    const callsfunc = tracker.calls(callback, 1);
    debugSourceMap(link, line, column, callsfunc);
}

function test2() {
    const link = "https://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map";
    const line = 1;
    const column = 2000;
    const callback = (data) => {
        assert.ok(typeof data === "object");
        success("debugSourceMap 远程 HTTPS SourceMap 文件：", data);
    };
    const callsfunc = tracker.calls(callback, 1);
    debugSourceMap(link, line, column, callsfunc);
}

function test3() {
    const link = "./test/demo.js.map";
    const line = 1;
    const column = 3000;
    const callback = (data) => {
        assert.ok(typeof data === "object");
        success("debugSourceMap 本地 SourceMap 文件：", data);
    };
    const callsfunc = tracker.calls(callback, 1);
    debugSourceMap(link, line, column, callsfunc);
}

function test4() {
    const link = "http://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map";
    const line = 3;
    const column = 1000;
    const callback = (data) => {
        assert.ok(typeof data === "object");
        success("debugSourceMap 远程 HTTP SourceMap 文件，但输入一个不存在的行列：", data);
    };
    const callsfunc = tracker.calls(callback, 1);
    debugSourceMap(link, line, column, callsfunc);
}

// 调用 tracker.verify() 并验证是否所有 tracker.calls() 函数都已被准确调用。

test1();
test2();
test3();
test4();
process.on("exit", () => {
    tracker.verify();
});
