const characters = [
    {name: 'Sonic', animal: 'hedgehog'},
    {name: 'Tails', animal: 'fox'},
    {name: 'Knuckles', animal: 'echidna'},
]

const badniks = [
    {name: 'Crabmeat', zone: 'Green Hill Zone'},
    {name: 'Caterkiller', zone: 'Green Hill Zone'},
    {name: 'Buzz Bomber', zone: 'Marble Zone'},
    {name: 'Cop Speeders', zone: 'Speed Highway'},
]

exports.seed = async function(knex) {
    await knex('characters').insert(characters)
    await knex('badniks').insert(badniks)
};