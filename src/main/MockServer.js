export default class MockServer {

    #receivedRequests = []
    #defaultResponse = null

    constructor(defaultResponse) {
        this.#defaultResponse = defaultResponse
    }

    allVerified() {
        return this.#receivedRequests.length === 0
    }

    handle(req, res) {
        this.#receivedRequests.push(req)
        this.#defaultResponse(req, res)
    }
}