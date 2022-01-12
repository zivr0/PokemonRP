const express = require('express')
const Pokemon = require('../models/pokemon')
const router = express.Router()

//All Pokemon
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name != '')
    searchOptions.name = new RegExp(req.query.name, 'i')
  try {
    const pokemon = await Pokemon.find(searchOptions)
    res.render('pokemon/index', {
      pokemon: pokemon,
      searchOptions: req.query,
    })
  } catch {
    res.redirect('/')
  }
  res.render('pokemon/index')
})

// New Pokemon
router.get('/new', (req, res) => {
  res.render('pokemon/new', { pokemon: new Pokemon() })
})

//Create Pokemon Route
router.post('/', async (req, res) => {
  const pokemon = new Pokemon({
    name: req.body.name,
  })
  try {
    const newPokemon = await pokemon.save()
    // res.redirect(`pokemon/${newPokemon.id}`)
    res.redirect('pokemon')
  } catch {
    res.render('pokemon/new', {
      pokemon: pokemon,
      errorMessage: 'Error creating Pokemon',
    })
  }
})
module.exports = router
