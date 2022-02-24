const request = require("supertest")
const db = require('../data/db-config')
const server = require("./server")

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=>{
    await db.seed.run()
})

afterAll(async ()=>{
    await db.destroy()
})

describe("[GET] /characters", ()=>{
    it("should return a 200 OK status", async () => {
        const res = await request(server).get("/api/characters")
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        // expect(res.body.id).toBe(2)
        // expect(res.body.name).toBe("Tails")
    })
})

describe("[GET] by id", ()=>{
    it("gets character by id", async () => {
        const res = await request(server).get("/api/characters/2")
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.id).toBe(2)
        expect(res.body.name).toBe("Tails")
    })
})
