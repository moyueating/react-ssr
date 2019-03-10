## react-ssr
react-ssr架子，资源部署到七牛cdn，因使用的免费版（有效期只有30天），资源可能会过期，需要重新配置上传。

域名访问 http://whutzkj.com/ssr/list 


### 本地开发

```js
npm run build:client
npm run build:server
```

### 打包到本地

```js
npm run build
```

### 部署cdn

```js
npm run upload
```

### TODO
加上pm2管理