const bodyParser = require('body-parser')
const express = require('express')
const {
  getAllNostalgiaItems,
  getNostalgiaItemsByIdentifierWithAllLinkedData,
  createNewNostalgiaItem,
  deleteNostalgiaItem
} = require('./controllers/nostalgiaItems')

const { getNostalgiaItemsByCategory } = require('./controllers/categories')
const { getNostalgiaItemsByDecade } = require('./controllers/decades')

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))
app.get('/', (request, response) => response.render('docs/index'))

app.get('/all', getAllNostalgiaItems)
app.get('/:identifier', getNostalgiaItemsByIdentifierWithAllLinkedData)
app.post('/', bodyParser.json(), createNewNostalgiaItem)
app.delete('/:slug', bodyParser.json(), deleteNostalgiaItem)

app.get('/category/:category', getNostalgiaItemsByCategory)

app.get('/decade/:decade', getNostalgiaItemsByDecade)

app.all('*', (request, response) => response.status(404).send('Page Not Found'))

app.listen(1990, () => {
  console.log('Fondly remembering on port 1990...') // eslint-disable-line no-console
})
