import {beforeEach, test} from 'node:test'
import MockServer from '../main/MockServer.js'
import assert from 'node:assert/strict'

let server = new MockServer()

beforeEach(() => {
    server = new MockServer()
})

test("noUnverifiedRequestsByDefault", () => {
    assert.equal(server.allVerified(), true)
})

test("unverifiedRequests", () => {
    const req = {
        method: 'GET',
        url: "/some-url"
    }
    server.handle(req)
    assert.equal(server.allVerified(), false)
})
