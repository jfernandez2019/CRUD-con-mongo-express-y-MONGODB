const express = require('express')
const router = express.Router()
const Book = require('../models/books.models')

//MIDDLEWARE
const getbook = async (req, res, next) => {
    let book;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({
            message: 'El ID del libro no es valido'
        })
    }

    try {
        book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
    res.book = book;
    next()
}

//obtener todos los libros
router.get('/', async (req, res) => {
    try {
        const books = await Book.find()
        console.log('GET ALL', books)
        if (books.length === 0) {
            return res.status(204).json([])
        }
        res.json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Crear nuevo libro

router.post('/', async (req, res) => {
    const { title, author, genre, publication_date } = req?.body

    if (!title || !author || !genre || !publication_date) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const books = new Book({
        title,
        author,
        genre,
        publication_date
    })

    try {
        const newbook = await books.save()
        console.log(newbook)
        res.status(201).json(newbook)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router 