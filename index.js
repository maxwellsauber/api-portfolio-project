const express = require('express')
// const path = require('path')
const { getNostalgia, getToys, getCartoons } = require('./controllers/nostalgia')

const app = express()

app.get('/', getNostalgia)

app.get('/toys', getToys)

app.get('/cartoons', getCartoons) // Bot calling duplicaate functions thing.... fix this............ focus on what we want the damn API TO DO!

app.set('view engine', 'pug')
app.use(express.static('public'))
app.get('/docs', (request, response) => response.render('docs/index'))

app.all('*', (request, response) => response.status(404).send('Page Not Found'))

app.listen(1990, () => {
  console.log('Listening on port 1990...') // eslint-disable-line no-console
})
