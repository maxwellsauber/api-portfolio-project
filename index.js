const express = require('express')
const path = require('path')
const { getNostalgia } = require('./controllers/nostalgia')

const app = express()

app.get('/', getNostalgia)

app.use(express.static('docs'))
app.get('/docs', (request, response) => response.status(404).sendFile(path.join(__dirname, 'docs', 'index.html')))

app.listen(1990, () => {
  console.log('Listening on port 1990...') // eslint-disable-line no-console
})
