import {beforeEach, test} from 'node:test'
import MockServer from '../main/MockServer.js'
import assert from 'node:assert/strict'

let server = new MockServer()

beforeEach(() => {
    server = new MockServer((req, res) => {
        res.status = 404
    })
})

test("noUnverifiedRequestsByDefault", () => {
    assert.equal(server.allVerified(), true)
})

test("unverifiedRequests", () => {
    const req = {
        method: 'GET',
        url: "/some-url"
    }
    server.handle(req, {})
    assert.equal(server.allVerified(), false)
})

test("defaultResponse", () => {
    const req = {}
    const res = {status: undefined}
    server.handle(req, res)
    assert.equal(res.status, 404)
})

// test("respondWith", () => {
//     const req = {
//         method: 'GET',
//         url: "/some-url"
//     }
//     const res = {
//         req: req,
//         status: 404
//     }
//
//     server.respondWith(async (req, res) => {
//         res.end("Responded")
//     })
//
//     server.handle()
// })
