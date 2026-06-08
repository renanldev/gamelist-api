const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { listar, buscarPorId, criar, atualizar, deletar } = require('../controllers/jogoController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
})

const upload = multer({ storage })

router.get('/', listar)
router.get('/:id', buscarPorId)
router.post('/', upload.single('foto'), criar)
router.put('/:id', upload.single('foto'), atualizar)
router.delete('/:id', deletar)

module.exports = router