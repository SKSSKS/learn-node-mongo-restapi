const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
    const pathName = req.url

    let msg = ''
    if( pathName==='/' || pathName==='/overview' ) {
        msg = `This is overview api route`
    } else if(pathName==='/product') {
        msg = `This is product api route`
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello suraj'
        })
        msg = `${pathName} This route does not exist`
    }
    return res.end(msg)
})

const port = 4000
const localhost = '127.0.0.1'

server.listen(port, localhost, () => {
    console.log(`server running on: ${localhost}:${port}`)
})
