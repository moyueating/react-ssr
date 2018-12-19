const ejs = require('ejs')
const { Helmet } = require('react-helmet')
const ReactDomServer = require('react-dom/server')
const bootstrapper = require("react-async-bootstrapper")

const getStoreState = (stores) => {
  console.log('getStoreState', stores)
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = function(bundle, template, req, res){
  const routerContext = {}
  console.log(bundle)
  const createStore = bundle.createStore
  const createApp = bundle.default
  
  const stores = createStore()
  const appHtml = createApp(stores, req.url, routerContext)

  bootstrapper(appHtml).then(() => {
    if(routerContext.action === 'REPLACE'){
      res.redirect(302, routerContext.url)
      return res.end()
    }

    const state = getStoreState(stores)
    const content = ReactDomServer.renderToString(appHtml)
    // helmet的renderStatic要在renderToString之后
    const helmet = Helmet.renderStatic()

    const html = ejs.render(template, {
      appHtml: content,
      initalState: JSON.stringify(state),
      meta: helmet.meta.toString(),
      title: helmet.title.toString(),
      link: helmet.link.toString(),
      style: helmet.style.toString()
    })

    res.send(html)
  })

}