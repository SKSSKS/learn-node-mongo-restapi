const fs = require('fs')

const text = fs.readFileSync('1-node-farm/txt/input.txt', 'utf-8')

console.log(text)

const textToWrite = `This is all about avacado: ${text}.\n created on ${Date.now()}`

fs.writeFileSync('1-node-farm/txt/input.txt', textToWrite)
