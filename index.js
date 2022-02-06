const express = require('express')
const app = express()
const Bin = require('./models/bin')
var stringify = require('json-stringify-safe')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')

const isUniqueUrl = async (url) => {
  return Bin.find({ url }).then((bins) => {
    return !bins.length
  })
}

function randomUrl() {
  let str = ''
  for (let i = 0; i < 6; i++) {
    let ind = Math.floor(Math.random() * chars.length)

    str += chars[ind]
  }
  return str
}

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  Bin.find({})
    .then((notes) => {
      response.json(notes)
    })
    .catch((error) => response.status(404).send({ error: 'Bin not found.' }))
})

app.post('/bins', async (request, response) => {
  let url = randomUrl()
  while (!(await isUniqueUrl(url))) {
    url = randomUrl()
  }

  const bin = new Bin({
    url,
    createdAt: Date.now(),
  })

  bin
    .save()
    .then((savedBin) => {
      response.json(savedBin)
    })
    .catch((error) =>
      response.status(404).send({ error: 'Could not create new bin.' })
    )
})

app.get('/bin/:url', (request, response) => {
  Bin.findOne({ url: request.params.url })
    .then((res) => response.json(res))
    .catch((error) =>
      response.status(404).send({ error: 'Could not find bin.' })
    )
})

app.all('/:url', (request, response) => {
  const req = {
    timestamp: Date.now(),
    method: request.method,
    ip: request.headers['x-forwarded-for'],
    url: request.originalUrl,
    body: stringify(request.body),
    headers: request.headers,
    query: stringify(request.query),
    raw: stringify(request),
  }

  Bin.findOneAndUpdate(
    { url: request.params.url },
    { $push: { requests: req } },
    { new: true }
  ).then((res) => {
    if (res) {
      response
        .status(200)
        .send({ ip_address: request.headers['x-forwarded-for'] })
    } else {
      response.status(404).send({ error: 'Could not add request.' })
    }
  })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
