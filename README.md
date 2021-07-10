# debug-sm

## 帮助文档

```
参数 1 SourceMapFilePath : SourceMap 文件相对路径 或者 远程路径
参数 2 Line              : SourceJS  要查找的的行
参数 2 Column            : SourceJS  要查找的的列
```

快速使用

```bash
npx source-map debug-sm ./test.js.map 1 1000

npx source-map debug-sm http://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map 1 1000

npx source-map debug-sm https://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map 1 1000
```

开发使用

```bash
# 本机文件
node debug.js ./pc.js.map 1 1000
# 远程 HTTP 文件
node debug.js http://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map 1 1000
# 远程 HTTPS 文件
node debug.js https://s1.hdslb.com/bfs/cm/cm-sdk/static/js/pc.js.map 1 1000
```

## License

[MIT](LICENSE).
