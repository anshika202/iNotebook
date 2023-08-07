const connectToMonogo = require('./db');

const express = require('express')
connectToMonogo();

const app = express()
const port = 5000

app.use(express.json())
var cors = require('cors')

app.use(cors())


// available routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook is listening on http://localhost:${port}`)
})

