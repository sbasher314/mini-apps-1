const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));
app.use(express.static('client/dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/client/dist/index.html")
})

app.listen(port, () => {
  console.log(`Connect 4 listening at http://localhost:${port}`)
})
