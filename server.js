const express = require('express')
const path = require('path')
const helmet = require("helmet")

const app = express()

app.use(helmet({
  frameguard: {
    action: "deny"
  }
}))

const env = process.env.NODE_ENV

if (env === 'production') {
  // app.get('*.css', (req, res, next) => {
  //   console.log(req.url);
  //   req.url += '.gz'
  //   res.set('Content-Encoding', 'gzip')
  //   next()
  // })

  app.get('*.js', (req, res, next) => {
    console.log(req.url);
    // const vendorUrlRegex = /vendor.*.js/
    // req.url += '.gz'
    // res.set('Content-Encoding', 'gzip')
    //res.set('Content-Type', 'text/javascript')
    // if (vendorUrlRegex.test(req.url)) {
    //   res.setHeader('Cache-Control', 'private, max-age=31536000')
    // }
    console.log("req", req.url)
    const runtimeUrlRegex = /runtime.*.js/
    if (!runtimeUrlRegex.test(req.url)) {
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'text/javascript')
    }
    next()
  })
}
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(8080, function () {
  console.log('Server is running on the port 8080')
})

