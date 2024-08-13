import { PrismaClient, Book } from "@prisma/client"
import request from "supertest"
import server from "@/index"

let defaultBook: Book
beforeEach(async () => {
    const prisma = new PrismaClient()
    defaultBook = await prisma.book.create({
        data: {
            title: "Test Book",
            author: "Jest"
        }
    })
    await prisma.book.create({
        data: {
            title: "Another Book",
            author: "Express"
        }
    })
    await prisma.$disconnect()
})

afterEach(async () => {
    const prisma = new PrismaClient()
    await prisma.book.deleteMany()
    await prisma.$disconnect()
})

afterAll(async () => {
    server.close()
})

describe("Book Routes", () => {
    it("should list all books", async () => {
        await request(server)
            .get("/books")
            .expect(200)
            .then((response) => {
                expect(response.body.data.length).toBe(2)

                const book = response.body.data.find((book: Book) => book.id === defaultBook.id)
                expect(book).toBeDefined()
                expect(book.title).toBe("Test Book")
                expect(book.author).toBe("Jest")
            })
    })

    it("should create a new book", async () => {
        await request(server)
            .post("/books")
            .send({
                title: "Book Title",
                author: "Book Author"
            })
            .expect(201)
            .then((response) => {
                expect(response.body.data.id).toBeDefined()
                expect(response.body.data.title).toBe("Book Title")
                expect(response.body.data.author).toBe("Book Author")
            })
    })

    it("should not create a book that already exists", async () => {
        await request(server)
            .post("/books")
            .send({
                title: "Test Book",
                author: "Jest"
            })
            .expect(400)
            .then((response) => {
                expect(response.body.error).toBe("Book already exists")
            })
    })

    it("should not create a book with invalid input", async () => {
        const invalidInputs = [
            { title: "Book Title" }, { author: "Book Author" }, { title: "", author: "Book Author" },
            { title: "Book Title", author: "" }, { title: "", author: "" }, { title: 1, author: "Book Author" },
            { title: "Book Title", author: 1 }, { title: null, author: "Book Author" }, { title: "Book Title", author: null },
            { title: null, author: null }, { title: "   ", author: "Book Author" }, { title: "Book Title", author: "   " }, {}
        ]

        for (const input of invalidInputs) {
            await request(server)
                .post("/books")
                .send(input)
                .expect(400)
                .then((response) => {
                    expect(response.body.error).toBe("Invalid input")
                })
                .catch((error) => {
                    throw new Error(`Test failed for input: ${JSON.stringify(input)}, Error: ${error.message}`)
                })
        }
    })

    it("should update a book", async () => {
        await request(server)
            .put(`/books/${defaultBook.id}`)
            .send({
                title: "Updated Book Title",
            })
            .expect(200)
            .then((response) => {
                expect(response.body.data.id).toBe(defaultBook.id)
                expect(response.body.data.title).toBe("Updated Book Title")
                expect(response.body.data.author).toBe("Jest")
            })
    })

    it("should not update a book that does not exist", async () => {
        await request(server)
            .put("/books/invalid-id")
            .send({
                title: "Updated Book Title",
            })
            .expect(404)
            .then((response) => {
                expect(response.body.error).toBe("Book not found")
            })
    })

    it("should not update a book to one that already exists", async () => {
        await request(server)
            .put(`/books/${defaultBook.id}`)
            .send({
                title: "Another Book",
                author: "Express"
            })
            .expect(400)
            .then((response) => {
                expect(response.body.error).toBe("Book already exists")
            })
    })

    it("should not update a book with invalid input", async () => {
        const invalidInputs = [
            { title: "" }, { title: 1 }, { title: null }, { title: "   " },
            { author: "" }, { author: 1 }, { author: null }, { author: "   " },
        ]

        for (const input of invalidInputs) {
            await request(server)
                .put(`/books/${defaultBook.id}`)
                .send(input)
                .expect(400)
                .then((response) => {
                    expect(response.body.error).toBe("Invalid input")
                })
                .catch((error) => {
                    throw new Error(`Test failed for input: ${JSON.stringify(input)}, Error: ${error.message}`)
                })
        }
    })

    it("should delete a book", async () => {
        await request(server)
            .delete(`/books/${defaultBook.id}`)
            .expect(204)
    })

    it("should not delete a book that does not exist", async () => {
        await request(server)
            .delete("/books/invalid-id")
            .expect(404)
            .then((response) => {
                expect(response.body.error).toBe("Book not found")
            })
    })
})