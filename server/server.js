const express = require('express')
const path = require('path')
const fs = require('fs')
const isDev = process.env.NODE_ENV === 'development'

const app = express()
if(isDev){

  const devStatic= require('./utils/dev-static')
  devStatic(app)

}else{
  const App = require('./app').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', (req, res) => {
    const appString = ReactDOMServer.renderToString(App)
    res.send(
      template.replace('<!--app-->', appString)
    )
  })
}

app.listen(8089, () => console.log('Example app listening on port 8089!'))