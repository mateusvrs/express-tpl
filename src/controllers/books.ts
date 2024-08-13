import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { BookCreateInput, BookUpdateInput } from '@/validators/books'

const prisma = new PrismaClient()

const listBooks = async (req: Request, res: Response) => {
    try {
        const books = await prisma.book.findMany()

        res.status(200).json({
            message: 'List of books',
            data: books,
        })
    } catch {
        res.status(500).json({
            error: 'Internal server error',
        })
    }
}

const createBook = async (req: Request, res: Response) => {
    const { success, data } = BookCreateInput.safeParse(req.body)

    if (!success) {
        return res.status(400).json({
            error: 'Invalid input',
        })
    }

    try {
        const book = await prisma.book.create({
            data: data,
        })

        res.status(201).json({
            message: 'Create a book',
            data: book,
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    error: 'Book already exists',
                })
            }
        }

        res.status(500).json({
            error: 'Internal server error',
        })
    }
}

const updateBook = async (req: Request, res: Response) => {
    const id: string = req.params.id

    const { success, data } = BookUpdateInput.safeParse(req.body)

    if (!success) {
        return res.status(400).json({
            error: 'Invalid input',
        })
    }

    try {
        const book = await prisma.book.update({
            where: {
                id: id,
            },
            data: data,
        })

        res.status(200).json({
            message: 'Update a book',
            data: book,
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    error: 'Book not found',
                })
            } else if (error.code === 'P2002') {
                return res.status(400).json({
                    error: 'Book already exists',
                })
            }
        }

        res.status(500).json({
            error: 'Internal server error',
        })
    }
}

const deleteBook = async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        await prisma.book.delete({
            where: {
                id: id,
            },
        })

        res.status(204).send()
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    error: 'Book not found',
                })
            }
        }

        res.status(500).json({
            error: 'Internal server error',
        })
    }
}

export { listBooks, createBook, updateBook, deleteBook }