const express = require('express')
const mongoose = require('mongoose')
const pokemonRouter = require('./routes/pokemon')
const app = express()

mongoose.connect('mongodb://localhost/pokemon')

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
