/**
 * 通过webpack函数直接去监听内存中打包文件的变化，动态读取内存中的bundle作为入口文件
 */

const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')
const MemoryFileSystem = require("memory-fs")
const webpackServerConfig = require('../../config/webpack.server')

const Module = require('module')
const mfs = new MemoryFileSystem()

const serverCompile = webpack(webpackServerConfig)

let serverBundle
// 关键：将webpack输入指定内存中
serverCompile.outputFileSystem = mfs
serverCompile.watch({}, (err, stats) => {
  if (err) throw err
  const info = stats.toJson()
  if (stats.hasErrors()) {
    info.errors.forEach(err => console.error(err))
  }
  if (stats.hasWarnings()) {
    info.warnings.forEach(err => console.error(err))
  }
  // 读取bundle在内存中的路径
  const bundlePath = path.join(
    webpackServerConfig.output.path,
    webpackServerConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server_entry.js')
  serverBundle = m.exports.default
})


function getTemplate() {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:3000/public/index.html').then(res => {
      resolve(res.data)
    }).catch(reject)
  })
}


module.exports = function devSSR(app) {

  app.use('/public', proxy({
    target: 'http://127.0.0.1:3000'
  }))

  app.get('*', (req, res) => {
    getTemplate().then(tpl => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(
        tpl.replace('<!--app-->', content)
      )  
    })
  })

}