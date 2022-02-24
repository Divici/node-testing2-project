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

    it("returns a 404 for missing character", async () => {
		const res = await request(server).get("/api/characters/50")
		expect(res.status).toBe(404)
	})
})

describe("[POST] /characters/:id", ()=>{
    it("creates a new character", async () => {
		const res = await request(server)
			.post("/api/characters")
			.send({ name: "E-101", animal: 'robot' })
		expect(res.status).toBe(201)
		expect(res.type).toBe("application/json")
		expect(res.body.name).toBe("E-101")
		expect(res.body.id).toBeDefined()
	})
})
