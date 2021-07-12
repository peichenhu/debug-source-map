# debug-source-map

`Node` 环境的工具，使用`行列信息`定位查找 SourceMap 中的资源信息。

## 帮助文档

```
参数 1 SourceMapFilePath : SourceMap 文件相对路径 或者 远程路径
参数 2 Line              : SourceJS  要查找的的行
参数 2 Column            : SourceJS  要查找的的列
```

快速或者全局使用

```bash
# 全局安装
npm i debug-source-map -g
# 全局安装后使用
debug-source-map ./test.js.map 1 1000
debug-source-map http://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map 1 1000
debug-source-map https://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map 1 1000

# 快速使用
npx debug-source-map ./test.js.map 1 1000
npx debug-source-map http://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map 1 1000
npx debug-source-map https://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map 1 1000
```

## License

[MIT](LICENSE).
