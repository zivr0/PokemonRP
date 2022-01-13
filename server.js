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
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use('/pokemon', pokemonRouter)

app.get('/', async (req, res) => {
  const pokemon = await Pokemon.find().sort({ createdAt: 'desc' })
  res.render('pokemon/index', { pokemon })
})

app.listen(process.env.PORT || 5000)
