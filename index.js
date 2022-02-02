const express = require('express')
const app = express()
const Bin = require('./models/bin')
var stringify = require('json-stringify-safe');

const chars = ("abcdefghijklmnopqrstuvwxyz0123456789").split('');

function randomUrl() {
  let str = ''
  for (let i = 0; i < 6; i++ ) {
    let ind = Math.floor(Math.random() * chars.length)

    str += chars[ind]
  }
  return str
}

app.use(express.json())

app.get('/', (request, response) => {
  Bin.find({}).then(notes => {
    response.json(notes)
  })
})

app.post('/bins', (request, response) => {
  const bin = new Bin({
    url: randomUrl(),
    createdAt: Date.now(),
  })

  bin.save().then(savedBin => {
    response.json(savedBin)
  })
})

app.get('/bin/:url', (request, response) => {
  Bin.findOne({ url: request.params.url }).then(res =>
    response.json(res)
  )
})

app.all('/:url', (request, response) => {
  const req = {
              timestamp: Date.now(),
              method: request.method,
              ip: request.headers["x-forwarded-for"],
              url: request.originalUrl,
              body: stringify(request.body),
              headers: request.headers,
              query: stringify(request.query),
              raw: stringify(request)
              }

  Bin.findOneAndUpdate({url: request.params.url},
    {$push: {requests: req}},
    {new: true}).then(res => response.status(200).send("All Good"))
})


const PORT = 3000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
