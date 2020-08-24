const express = require('express')

const app = express()

// Middleware
app.use(express.json()) // to put body in to req

// app.get('/', (req, res) => {
//     // return res.status(200).end('welcome to express')
//     // return res.status(200).send('welcome to express')
//     return res.status(200).json({message: 'welcome to express'})
// })

// app.post('/', (req, res) => {
//     console.log('======>>', req)
//     return res.status(200).json({message: 'You can post to this url'})
// })

const fs = require('fs')
const toursFile = fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
const toursData = JSON.parse(toursFile)
app.get('/api/v1/tours', (req, res) => {
    return res.status(200).json({
        status: 'Success',
        statusCode: 200,
        results: toursData.length,
        data: {tours: toursData}
    })
})

app.post('/api/v1/tours', (req,res) => {
    console.log('=======>', req.body)
    const newId = toursData.length + 1
    const newTour = {id: newId, ...req.body}
    toursData.push(newTour)
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(toursData) ,(err) => {
        return res.json({
            statusCode: 201, // created succesfully
            status: 'Success',
            data: {
                tour: newTour
            }
        })
    })
})

// respond to url params
app.get('/api/v1/tours/:id', (req,res) => {
    const tourId = +req.params.id
    const tourData = toursData.filter(tour => tour.id === tourId)
    res.json({
        statusCode: 200,
        status: 'Success',
        data: {
            tour: tourData
        }
    })
})

const port = 7000
app.listen(port, () => {
    console.log(`Server started on http://127.0.0.1:${port}`)
})
