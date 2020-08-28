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

// respond to multiple url params
app.get('/api/v1/tours/:id/:name', (req,res) => {
    const { id, name } = req.params
    res.send(`id: ${id} and name: ${name}`)
})

// respond to optional url params
app.get('/api/v1/tours/:id/:name?', (req,res) => {
    const { id, name } = req.params
    res.send(`id: ${id} and optional param name: ${name}`)
})

// NOTE -> handling patch request
// NOTE -> patch is use to update property of data, and put is use to update complete data, this is just a convention
app.patch('/api/v1/tours/:id', (req,res) => {
    const { id } = req.params
    const {tourName, dificullty} = req.body
    const updatedTourData = [...toursData]
    const updatedTour = updatedTourData.filter(tour => {
        if(+id===tour.id) {
            tour.name = tourName
            tour.dificullty = dificullty
            return tour
        }
    })
    console.log('=========>', updatedTour.length)
    if(updatedTour.length) {
        res.status(200).json({
            status: 'Success',
            statusCode: 200,
            data: {
                tour: updatedTour
            }
        })
    } else {
        res.status(404).json({
            error: `There is no tour with this id: ${id}`
        })
    }
})


// NOTE -> handling delete request
app.delete('/api/v1/tours/:id', (req,res) => {
    const { id } = req.params
    const deletedTour = toursData.filter(tour => +id===tour.id)

    if(deletedTour.length) {
        res.status(204).json({
            status: 'Success',
            statusCode: 204,
            data: null //{tour: deletedTour}
        })
    } else {
        res.status(404).json({
            error: `There is no tour with this id: ${id}`
        })
    }
})

const port = 7000
app.listen(port, () => {
    console.log(`Server started on http://127.0.0.1:${port}`)
})
