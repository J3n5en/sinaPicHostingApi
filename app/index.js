const http = require('http')
const formidable = require('formidable')
const config = require('./config.json')
const getImgUrl = require('./helper.js')
var port = config.port || 8080
const url = config.url || '/upload'
var log4js = require('log4js')
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/sinaPicHosting.log', category: 'sinaPicHosting' }
  ]
})
var log = log4js.getLogger('sinaPicHosting')
http.createServer(function (req, res) {
  var content = ""
  if (req.url == url) {
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
      if(err) {
        res.send(err)
        return
      }
      let picSize = fields.size || config.default.size || 'large'
      let protocol = fields.protocol || config.default.protocol || 'https'
      preUrl= (protocol==='https')?'https://ws1.sinaimg.cn/':'http://ww1.sinaimg.cn/'
      if (!files.file) {
        res.writeHead(200, {"Content-Type": "text/json"})
        log.error('no file found')
        res.write(JSON.stringify({
          status: 'false',
          info: 'plz upload a pic'
        }))
        res.end()
        return
      }
      getImgUrl(files.file.path).then((result)=>{
        res.writeHead(200, {"Content-Type": "text/json"})
        if (result) {
          res.write(JSON.stringify({
            status:'success',
            url:[preUrl,picSize,'/',result].join('')
          }))
          log.info('success upload a pic')
        } else {
          log.error('fail upload a pic')
          res.write(JSON.stringify({
            status:'false'
          }))
        }
        res.end()
      })
      })
  } else {
      res.writeHead(404, {"Content-Type": "text/plain"})
      res.write('not fonud')
      res.end()
  }
}).listen(port)
log.info(`app run at ${port}`)