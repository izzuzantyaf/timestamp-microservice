const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors({ optionsSuccessStatus: 200 }))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/:date?', (req, res) => {
  const { date } = req.params
  if (!date) {
    res.json({
      unix: Date.now(),
      utc: new Date().toUTCString()
    })
  } else {
    // cek apakah input hanya berupa UNIX
    const isUnix = /^\d+$/.test(date)
    const check = new Date(parseInt(date))
    if (check instanceof Date && !isNaN(check.valueOf()))
      res.json({
        unix: isUnix ? parseInt(date) : Date.parse(new Date(date)),
        utc: new Date(isUnix ? parseInt(date) : date).toUTCString()
      })
    else
      res.json({ error: 'Invalid Date' })
  }
})

app.listen(process.env.PORT ?? 3000, () => {
  console.info('Server is up')
})