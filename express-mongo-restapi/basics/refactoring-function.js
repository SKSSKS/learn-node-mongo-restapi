const express = require('express')

const app = express()

// Middleware
app.use(express.json()) // to put body in to req

const fs = require('fs')
const toursFile = fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
const toursData = JSON.parse(toursFile)

const getAllTours = (req, res) => {
    return res.status(200).json({
        status: 'Success',
        statusCode: 200,
        results: toursData.length,
        data: {tours: toursData}
    })
}

const createTour = (req,res) => {
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
}

const getTour = (req,res) => {
    const tourId = +req.params.id
    const tourData = toursData.filter(tour => tour.id === tourId)
    res.json({
        statusCode: 200,
        status: 'Success',
        data: {
            tour: tourData
        }
    })
}

const updateTour = (req,res) => {
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
}

const deleteTour = (req,res) => {
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
}

app.get('/api/v1/tours', getAllTours)
app.post('/api/v1/tours', createTour)
app.get('/api/v1/tours/:id', getTour)
app.patch('/api/v1/tours/:id', updateTour)
app.delete('/api/v1/tours/:id', deleteTour)

const port = 7000
app.listen(port, () => {
    console.log(`Server started on http://127.0.0.1:${port}`)
})
