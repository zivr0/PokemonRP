const express = require('express')
const Pokemon = require('./../models/pokemon')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('pokemon/new', { pokemon: new Pokemon() })
})

router.get('/:slug', async (req, res) => {
  const pokemon = await Pokemon.findOne({ slug: req.params.slug })
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
    res.redirect(`/pokemon/${pokemon.slug}`)
  } catch (e) {
    console.log(e)
    res.render('pokemon/new', { pokemon: pokemon })
  }
})
router.delete('/:id', async (req, res) => {
  await Pokemon.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router
