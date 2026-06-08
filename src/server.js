const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

const jogosRouter = require('./routes/jogos')
app.use('/jogos', jogosRouter)

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})