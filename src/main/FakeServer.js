export default class FakeServer {

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
        for (let i = 0; i < this.#receivedRequests.length; i++) {
            const req = this.#receivedRequests[i]
            if (req.method === httpMethod && regex.test(req.url)) {
                this.#receivedRequests.splice(i, 1)
                return req
            }
        }
        return null
    }

    async matching(httpMethod, regex) {
        while (true) {
            const req = this.tryMatch(httpMethod, regex)
            if (req !== null) {
                return req
            }
            await new Promise(resolve => setTimeout(resolve, 10))
        }
    }
}