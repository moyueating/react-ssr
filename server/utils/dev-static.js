/**
 * 通过webpack函数直接去监听内存中打包文件的变化，通过内存中的path动态读取编译后的bundle
 * 并通过将读取的字符串bundle模块化，最终输出我们的app
 */
const vm = require('vm')
const ejs = require('ejs')
const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')
const MemoryFileSystem = require("memory-fs")
const bootstrapper = require("react-async-bootstrapper")
const webpackServerConfig = require('../../config/webpack.server')
const { Helmet } = require('react-helmet')
const serverRender = require('./ssr')
const NativeModule = require('module')
const mfs = new MemoryFileSystem()


const getModuleFromString = (bundle, filename) => {
  const m = {exports: {}}
  const codeString = NativeModule.wrap(bundle)
  const script = new vm.Script(codeString, {
    filename,
    displayErrors: true
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

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
  // const m = new NativeModule()
  // m._compile(bundle, 'server_entry.js')
  const m = getModuleFromString(bundle, 'server_entry.js')
  // serverBundle = m.exports.default
  // createStore = m.exports.createStore
  serverBundle = m.exports
})


function getTemplate() {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs').then(res => {
      resolve(res.data)
    }).catch(reject)
  })
}

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}


module.exports = function devSSR(app) {

  app.use('/public', proxy({
    target: 'http://127.0.0.1:8888'
  }))

  app.get('*', (req, res) => {
    // console.log(req.url)
    getTemplate().then(tpl => {

      serverRender(serverBundle, tpl, req, res)
    })
  })

}