const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const ReactDomServer = require('react-dom/server')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(favicon(path.join(__dirname, path.join('../public'), 'favicon.ico')))

if(isDev){

  const devStatic= require('./utils/dev-static')
  devStatic(app)

}else{
  const App = require('../dist/server_entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', (req, res) => {
    const appString = ReactDomServer.renderToString(App)
    res.send(
      template.replace('<!--app-->', appString)
    )
  })
}

app.listen(3333, () => console.log('Example app listening on port 3333!'))