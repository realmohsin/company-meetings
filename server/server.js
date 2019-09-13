const path = require('path')
const express = require('express')
const expressStaticGzip = require('express-static-gzip')

const app = express()

const port = process.env.PORT || 8080
const distPath = path.join(__dirname, '../dist')

app.use(
  expressStaticGzip(distPath, {
    enableBrotli: true,
    orderPreference: ['br']
  })
)

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(port, () => console.log(`Server is running on port ${port}...`))
