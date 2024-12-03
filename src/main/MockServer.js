export default class MockServer {

    #receivedRequests = []
    #defaultResponse = null

    constructor(defaultResponse) {
        this.#defaultResponse = defaultResponse
    }

    allVerified() {
        return this.#receivedRequests.length === 0
    }

    async handle(req, res) {
        // since js is single threaded; need not lock list access/write
        this.#receivedRequests.push(req)
        await this.#defaultResponse(req, res)
    }
}