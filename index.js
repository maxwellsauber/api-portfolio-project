const express = require('express')
const { getCategory, getSlug, getDecade } = require('./controllers/nostalgia')
const { getAllNostalgiaItems, getNostalgiaItemsByParamWithAllLinkedData } = require('./controllers/nostalgiaItems')


const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))
app.get('/docs', (request, response) => response.render('docs/index'))

app.get('/', getAllNostalgiaItems)
app.get('/:param', getNostalgiaItemsByParamWithAllLinkedData)

app.get('/category/:category', getCategory)

app.get('/decade/:decade', getDecade)

app.get('/:slug', getSlug)

app.all('*', (request, response) => response.status(404).send('Page Not Found'))

app.listen(1990, () => {
  console.log('Listening on port 1990...') // eslint-disable-line no-console
})
