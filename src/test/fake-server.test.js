import {beforeEach, test} from 'node:test'
import MockServer from '../main/MockServer.js'
import assert from 'node:assert/strict'

let server = new MockServer()

beforeEach(() => {
    server = new MockServer()
})

test("noUnverifiedRequests", () => {
    assert.ok(server.allVerified())
})
