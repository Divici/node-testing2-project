const request = require("supertest")
const db = require('../../data/db-config')
const server = require("../server")

const character1 = {name: 'Amy', animal: 'hedgehog'}
const character2 = {name: 'Cream', animal: 'rabbit'}

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

test("correct env var", ()=>{
    expect(process.env.DB_ENV).toBe("testing")
})