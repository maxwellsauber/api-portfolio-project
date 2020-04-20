const express = require('express')
const path = require('path')
const { getNostalgia, getToys, getCartoons } = require('./controllers/nostalgia')

const app = express()

app.get('/', getNostalgia)

app.get('/toys', getToys)

app.get('/cartoons', getCartoons)

app.use(express.static('docs'))
app.get('/docs', (request, response) => response.sendFile(path.join(__dirname, 'docs', 'index.html')))

app.all('*', (request, response) => response.status(404).send('Page Not Found'))

app.listen(1990, () => {
  console.log('Listening on port 1990...') // eslint-disable-line no-console
})
