const cdnConfig = require('../app.config').cdn
const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')

const { accessKey, secretKey, bucket } = cdnConfig
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

const excludeFiles = ['server_entry.js', 'server.ejs', 'index.html']


const config = new qiniu.conf.Config()
// 空间对应的机房 
config.zone = qiniu.zone.Zone_z0

// 上传是否使用cdn加速
// config.useCdnDomain = true


const doUpload = (key, file) => {
  // 上传凭证
  const options = {
    scope: bucket + ":" + key
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)

  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()



  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, respBody, respInfo) => {
      if(err){
        return reject(err)
      }
      console.log(respBody)
      if(respInfo.statusCode == 200){
        resolve(respBody)
      }else{
        reject(respBody)
      }
    })
  })
}


const files = fs.readdirSync(path.join(__dirname, '../dist'))


const uploads = files.map(fileName => {
  if(excludeFiles.indexOf(fileName) === -1){
    return doUpload(fileName, path.join(__dirname, '../dist', fileName))
  }else{
    return Promise.resolve('this file not upload ' + fileName)
  }
})


Promise.all(uploads).then(res => {
  console.log('upload success:', res)
}).catch(errs => {
  console.log('upload fail:', errs)
})
