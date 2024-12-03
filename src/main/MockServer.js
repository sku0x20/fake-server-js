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
        this.#receivedRequests.push(req)
        await this.#defaultResponse(req, res)
    }
}