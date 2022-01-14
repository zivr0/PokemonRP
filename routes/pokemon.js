const express = require('express')
const Pokemon = require('./../models/pokemon')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('pokemon/new', { pokemon: new Pokemon() })
})

router.get('/:slug', async (req, res) => {
  const pokemon = await Pokemon.findOne({ slug: req.params.slug })
  if (pokemon == null) res.redirect('/')
  else res.render('pokemon/show', { pokemon: pokemon })
})

router.get('/edit/:id', async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.id)
  res.render('pokemon/edit', { pokemon: pokemon })
})

router.post(
  '/',
  async (req, res, next) => {
    req.pokemon = new Pokemon()
    next()
  },
  savePokemonAndRedirect('new')
)

router.put(
  '/:id',
  async (req, res, next) => {
    req.pokemon = await Pokemon.findById(req.params.id)
    next()
  },
  savePokemonAndRedirect('edit')
)
router.delete('/:id', async (req, res) => {
  await Pokemon.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function savePokemonAndRedirect(path) {
  return async (req, res) => {
    let pokemon = req.pokemon
    pokemon.name = req.body.name
    pokemon.url = req.body.url
    pokemon.description = req.body.description
    try {
      pokemon = await pokemon.save()
      res.redirect(`/pokemon/${pokemon.slug}`)
    } catch (e) {
      console.log(e)
      res.render(`pokemon/${path}`, { pokemon: pokemon })
    }
  }
}

module.exports = router
