if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const Pokemon = require('./models/pokemon')
const pokemonRouter = require('./routes/pokemon')
const methodOverride = require('method-override')
const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => {
  console.error(error)
})

db.once('open', () => {
  console.log('Connected to Mongoose')
})
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use('/pokemon', pokemonRouter)

app.get('/', async (req, res) => {
  const pokemon = await Pokemon.find().sort({ createdAt: 'desc' })
  res.render('Pokemon/index', { pokemon })
})

app.listen(process.env.PORT || 3000)
