const http = require('http')
const fs = require('fs')

const productData = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')

const server = http.createServer((req, res) => {
    const pathName = req.url
    
    if( pathName==='/product') {
        
        // ASYN version to read the file and send back
        // fs.readFile(`${__dirname}/data/data.json`, 'utf-8', (err, data) => {
        //     const productData = JSON.parse(data)
        //     res.writeHead(200, {
        //         'Content-type': 'application/json'
        //     })
        //     return res.end(data)
        // })

        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        return res.end(productData)

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello suraj' // you can specify your own header
        })
        return res.end(`${pathName} This route does not exist`)
    }
})

const port = 4000
const localhost = '127.0.0.1'

server.listen(port, localhost, () => {
    console.log(`server running on: ${localhost}:${port}`)
})