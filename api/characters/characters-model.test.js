const request = require("supertest")
const db = require('../../data/db-config')
const server = require("../server")
const Character = require('./characters-model')

const character1 = {name: 'Amy', animal: 'hedgehog'}
const character2 = {name: 'Cream', animal: 'rabbit'}

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=>{
    await db.seed.run()
})

// afterAll(async ()=>{
//     await db.destroy()
// })

test("correct env var", ()=>{
    expect(process.env.DB_ENV).toBe("testing")
})

describe("Character Model functions", ()=>{

    describe("Character find works",()=>{
        it("gets all characters", async () => {
            const characters = await Character.find()
            expect(characters.length).toBe(3)
        })
    
        it("inserted character name and animal", async ()=>{
            const characters = await Character.find()
            expect(characters[0]).toHaveProperty('id', 1)
            expect(characters[0]).toHaveProperty('name', 'Sonic')

            expect(characters[1]).toMatchObject({id:2, name:'Tails', animal:'fox'})
            expect(characters[2]).toMatchObject({id:3, name:'Knuckles', animal:'echidna'})
        })
    })

    describe("Character create", ()=>{

        it("adds character to the db", async ()=>{
            let characters
            await Character.createCharacter(character1)
            characters = await db('characters')
            expect(characters).toHaveLength(4)
    
            await Character.createCharacter(character2)
            characters = await db('characters')
            expect(characters).toHaveLength(5)
        })
    })

    

    

    
    
})