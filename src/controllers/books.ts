import { Request, Response } from 'express'

const listBooks = (req: Request, res: Response) => {
    res.json({
        message: 'List of books'
    })
}

const createBook = (req: Request, res: Response) => {
    res.json({
        message: 'Create a book'
    })
}

const updateBook = (req: Request, res: Response) => {
    res.json({
        message: 'Update a book'
    })
}

const deleteBook = (req: Request, res: Response) => {
    res.json({
        message: 'Delete a book'
    })
}

export { listBooks, createBook, updateBook, deleteBook }