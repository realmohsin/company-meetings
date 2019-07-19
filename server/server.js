const path = require('path')
const express = require('express')

const app = express()

const distPath = path.join(__dirname, '../dist')

app.use(express.static(distPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(8080, () => console.log('Server up at port 8080...'))
