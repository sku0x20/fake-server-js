export default class MockServer {

    #receivedRequests = []

    constructor() {
    }

    allVerified() {
        return this.#receivedRequests.length === 0
    }

    handle(req) {
        this.#receivedRequests.push(req)
    }
}