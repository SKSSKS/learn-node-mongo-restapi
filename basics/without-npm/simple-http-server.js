const http = require('http')

const server = http.createServer((req, res) => {
    console.log(res)
    res.end('hello suraj from the node server')
})

const port = 4000
const localhost = '127.0.0.1'

server.listen(port, localhost, () => {
    console.log(`server running on: ${localhost}:${port}`)
})
