import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
import Routes from '../src/routes';
import express from 'express'
import path from 'path'
import fs from 'fs';

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')

const app = express()

// public开头的请求全部归为资源文件，指向dist文件夹
app.use('/public', express.static(path.join(__dirname, '../dist')))


app.get('*', (req, res) => {
  console.log(req.url)
  const appString = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={{}}
    >
      <Routes />
    </StaticRouter>  
  )
  res.send(
    template.replace('<!--app-->', appString)
  )

})

app.listen(8089, () => console.log('Example app listening on port 8089!'))