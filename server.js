if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const pokemonRouter = require('./routes/pokemon')
const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

app.set('view engine', 'ejs')
app.use('/pokemon', pokemonRouter)
app.get('/', (req, res) => {
  const pokemon = [
    {
      title: 'Test Pokemon',
      createdAt: new Date(),
      description: 'Test Description',
    },
  ]
  res.render('pokemon/index', { pokemon })
})

app.listen(process.env.PORT || 5000)
