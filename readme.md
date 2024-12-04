# Fake Server Js

## eg. with node
```js
// setup
const fakeServer = new FakeServer(async (req, res) => {
    res.status = 404
    res.end()
})
const nodeServer = http.createServer((req, res) => {
    req.body = []
    req.on('data', chunk => {
        req.body.push(chunk);
    }).on('end', () => {
        req.body = Buffer.concat(req.body).toString()
        fakeServer.handle(req, res)
    })
})
nodeServer.listen(9000)
nodeServer.on('error', (err) => {
    console.error(`${err}`)
    process.exit(1)
})
nodeServer.on('listening', () => {
    console.log(`listening on port ${nodeServer.address().port}`)
})
```

```js
client.post("http://localhost:9000/some-path?test=2", {
    data: "some-data"
})

const req = await server.matching("POST", /some-path/)
console.log(req.body)
```