const express = require('express')

const server = express()

server.get('/', (req, res) => {
    // return res.status(200).end('welcome to express')
    // return res.status(200).send('welcome to express')
    return res.status(200).json({message: 'welcome to express'})
})

server.post('/', (req, res) => {
    console.log('======>>', req)
    return res.status(200).json({message: 'You can post to this url'})
})

const port = 7000
server.listen(port, () => {
    console.log(`Server started on http://127.0.0.1:${port}`)
})
