import {beforeEach, test} from 'node:test'
import FakeServer from '../main/FakeServer.js'
import assert from 'node:assert/strict'

let server = new FakeServer()

beforeEach(() => {
    server = new FakeServer(async (req, res) => {
        res.status = 404
    })
})

test("noUnverifiedRequestsByDefault", () => {
    assert.equal(server.allVerified(), true)
})

test("unverifiedRequests", async () => {
    const req = {
        method: 'GET',
        url: "/some-url"
    }
    await server.handle(req, {})
    assert.equal(server.allVerified(), false)
})

test("defaultResponse", async () => {
    const req = {}
    const res = {status: undefined}
    await server.handle(req, res)
    assert.equal(res.status, 404)
})

test("respondWith", async () => {
    const req = {
        method: 'GET',
        url: "/some-url"
    }
    const res = {
        req: req,
        status: undefined
    }

    const respond = async (req, res) => {
        await (new Promise(resolve => setTimeout(resolve, 20)))
        res.status = 200
    }
    server.responseWith(respond)
    await server.handle(req, res)
    assert.equal(res.status, 200)
})

test("nullIfNothingTryMatch", async () => {
    await server.handle(
        {
            method: 'GET',
            url: "/some-url"
        },
        {}
    )

    const req = server.tryMatch("GET", /\/another-url/)
    assert.equal(req, null)
})

test("tryMatch", async () => {
    let req = {
        method: 'GET',
        url: "/some-url"
    };
    await server.handle(
        req,
        {}
    )

    assert.equal(server.tryMatch("POST", /\/some-url/), null)
    assert.equal(server.tryMatch("GET", /\/another-url/), null)
    assert.equal(server.tryMatch("GET", /\/some-url/), req)
})

test("reqsIsFifo", async () => {
    let req = {
        method: 'GET',
        url: "/some-url"
    };
    await server.handle(req, {})
    assert.equal(server.tryMatch("GET", /\/some-url/), req)
    assert.equal(server.tryMatch("GET", /\/some-url/), null)

    await server.handle(req, {})
    assert.equal(server.tryMatch("GET", /\/some-url/), req)
    assert.equal(server.tryMatch("GET", /\/some-url/), null)
})

test("matching", async () => {
    let req = {
        method: 'GET',
        url: "/some-url"
    };
    const sendAsync = async () => {
        await new Promise(resolve => setTimeout(resolve, 50))
        await server.handle(req, {})
    }
    sendAsync()
    assert.equal(server.tryMatch("GET", /\/some-url/), null)
    const waitedReq =  await server.matching("GET", /\/some-url/)
    assert.equal(waitedReq, req)
})