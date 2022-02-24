const db = require('../../data/db-config')

function find() {
	return db("characters")
}

function findById(id) {
	return db("characters").where({ id }).first()
}

async function createCharacter(character){
    const [id] = await db('characters').insert(character)
    return db('characters').where('id',id).first()
}

module.exports = {
    find,
	findById,
    createCharacter,
}