const express = require('express');
const CharactersModel = require('./characters-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  CharactersModel.find()
    .then(characters => {
      res.json(characters)
    })
    .catch(next)
})

router.get("/:id", async (req, res, next) => {
	try {
		const character = await CharactersModel.findById(req.params.id)
		if (!character) {
			return res.status(404).json({
				message: "Character not found",
			})
		}
		res.json(character)
	} 
  catch (err) {
	  next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const character = await CharactersModel.createCharacter({
			name: req.body.name,
      animal: req.body.animal
		})

		res.status(201).json(character)
	} catch (err) {
		next(err)
	}
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router;