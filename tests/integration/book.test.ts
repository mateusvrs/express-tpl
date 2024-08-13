import { PrismaClient, Book } from '@prisma/client'
import request from 'supertest'
import server from '@/index'

afterEach(async () => {
    const prisma = new PrismaClient()
    await prisma.book.deleteMany()
    await prisma.$disconnect()
})

afterAll(async () => {
    server.close()
})

describe('Book complete Flow', () => {
    const checkOnListOfBooks = async (check: Book, quantity: number, present: boolean,) => {
        const listResponse = await request(server)
            .get('/books')
            .expect(200)

        const books = listResponse.body.data

        expect(books.length).toBe(quantity)

        const book = books.find((book: Book) => book.id === check.id)
        if (present) expect(book).toBeDefined()
        else expect(book).toBeUndefined()
    }

    it('should check flow of book creation with update', async () => {
        const createResponse = await request(server)
            .post('/books')
            .send({
                title: 'New Book',
                author: 'Jest',
            })
            .expect(201)

        await request(server)
            .post('/books')
            .send({
                title: 'Another Book',
                author: 'Express',
            })
            .expect(201)

        const createdBook = createResponse.body.data
        await checkOnListOfBooks(createdBook, 2, true)

        const updateResponse = await request(server)
            .put(`/books/${createdBook.id}`)
            .send({ title: 'Updated Book' })
            .expect(200)

        const updatedBook = updateResponse.body.data
        await checkOnListOfBooks(updatedBook, 2, true)
    })

    it('should check flow of book creation with delete', async () => {
        const createResponse = await request(server)
            .post('/books')
            .send({
                title: 'New Book',
                author: 'Jest',
            })
            .expect(201)

        const createdBook = createResponse.body.data
        await checkOnListOfBooks(createdBook, 1, true)

        await request(server)
            .delete(`/books/${createdBook.id}`)
            .expect(204)

        await checkOnListOfBooks(createdBook, 0, false)
    })
})