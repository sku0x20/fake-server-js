export default class MockServer {

    #receivedRequests = []
    #respond = null

    constructor(defaultResponse) {
        this.#respond = defaultResponse
    }

    allVerified() {
        return this.#receivedRequests.length === 0
    }

    async handle(req, res) {
        // since js is single threaded; need not lock list access/write
        this.#receivedRequests.push(req)
        await this.#respond(req, res)
    }

    responseWith(respond) {
        this.#respond = respond
    }

    tryMatch(httpMethod, regex) {
        return null;
    }

}