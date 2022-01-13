const express = require('express')
const Pokemon = require('./../models/pokemon')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('pokemon/new', { pokemon: new Pokemon() })
})

router.get('/:id', async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.id)
  if (pokemon == null) res.redirect('/')
  res.render('pokemon/show', { pokemon: pokemon })
})

router.post('/', async (req, res) => {
  let pokemon = new Pokemon({
    name: req.body.name,
    url: req.body.url,
    description: req.body.description,
  })
  try {
    pokemon = await pokemon.save()
    res.redirect(`/pokemon/${pokemon.id}`)
  } catch (e) {
    console.log(e)
    res.render('pokemon/new', { pokemon: pokemon })
  }
})
module.exports = router
