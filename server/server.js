const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const ssr = require('./utils/ssr')
const ReactDomServer = require('react-dom/server')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  cookie: {
    maxAge: 10 * 60 * 1000,
  },
  name: 'uid',
  resave: false,
  saveUninitialized: false,
  secret: 'cnode react ssr'
}))

app.use(favicon(path.join(__dirname, path.join('../public'), 'favicon.ico')))

app.use('/ssr/api/user', require('./utils/cnode-proxy-login'))
app.use('/ssr/api', require('./utils/cnode-proxy'))

if(isDev){
  const devStatic= require('./utils/dev-static')
  devStatic(app)

}else{
  const bundle = require('../dist/server_entry')
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf-8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', (req, res) => {
    // const appString = ReactDomServer.renderToString(App)
    // res.send(
    //   template.replace('<!--app-->', appString)
    // )
    ssr(bundle, template, req, res)
  })
}

app.listen(3333, () => console.log('Example app listening on port 3333!'))