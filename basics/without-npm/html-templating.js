const http = require('http')
const fs = require('fs')
const url = require('url')
const { createOverviewTemplate, createProductTemplate } = require('./utils/templateCreator')

const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')
const templateProductCard = fs.readFileSync(`${__dirname}/templates/product-card.html`, 'utf-8')
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const productData = JSON.parse(data)


const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true)
    if( pathname==='/' || pathname==='/overview') {
        res.writeHead(200, {'Content-type': 'text/html'})
        const productList = productData.map((data) => createOverviewTemplate(templateProductCard, data))

        return res.end(templateOverview.replace('{%PRODUCT_CARD%}', productList))

    } else if (pathname==='/product') {
        const data = productData[query.id]
        res.writeHead(200, {'Content-type': 'text/html'})
        const productPage = createProductTemplate(templateProduct, data, pathname)
        return res.end(productPage)
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello suraj' // you can specify your own header
        })
        return res.end(`${pathname} This route does not exist`)
    }
})

const port = 4000
const localhost = '127.0.0.1'

server.listen(port, localhost, () => {
    console.log(`server running on: ${localhost}:${port}`)
})