/**
 * 通过webpack函数直接去监听内存中打包文件的变化，通过内存中的path动态读取编译后的bundle
 * 并通过将读取的字符串bundle模块化，最终输出我们的app
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
    axios.get('http://localhost:8888/public/index.html').then(res => {
      resolve(res.data)
    }).catch(reject)
  })
}


module.exports = function devSSR(app) {

  app.use('/public', proxy({
    target: 'http://127.0.0.1:8888'
  }))

  app.get('*', (req, res) => {
    // console.log('body', req.body)
    console.log(req.url)
    getTemplate().then(tpl => {
      const routerContext = {}
      const appHtml = serverBundle(req.url, routerContext)
      const content = ReactDomServer.renderToString(appHtml)

      console.log(routerContext)
      if(routerContext.url){
        res.redirect(302, routerContext.url)
        return res.end()
      }

      console.log('content',content)
      res.send(
        tpl.replace('<!--app-->', content)
      )  
    })
  })

}