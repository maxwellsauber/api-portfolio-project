const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

const {
  deleteNostalgiaItem,
  getAllNostalgiaItems,
  getNostalgiaItemsByIdentifierWithAllLinkedData,
  createNewNostalgiaItem,
  patchNostalgiaItem,
  updateNostalgiaItem,
} = require('./controllers/nostalgiaItems')

const { getNostalgiaItemsByCategory } = require('./controllers/categories')
const { getNostalgiaItemsByDecade } = require('./controllers/decades')

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))
app.get('/api', (request, response) => response.render('docs/index'))

app.get('/api/category/:category', getNostalgiaItemsByCategory)
app.get('/api/decade/:decade', getNostalgiaItemsByDecade)

app.get('/api/all', getAllNostalgiaItems)
app.get('/api/:identifier', getNostalgiaItemsByIdentifierWithAllLinkedData)

app.delete('/api/:slug', bodyParser.json(), deleteNostalgiaItem)
app.patch('/api/:id', bodyParser.json(), patchNostalgiaItem)
app.post('/api/', bodyParser.json(), createNewNostalgiaItem)
app.put('/api/:id', bodyParser.json(), updateNostalgiaItem)


app.get('/all', (request, response) => response.sendFile(path.resolve(__dirname, 'public', 'index.html')))


app.all('*', (request, response) => response.status(404).send('Page Not Found'))


app.listen(1990, () => {
  console.log('Fondly remembering on port 1990...') // eslint-disable-line no-console
})
