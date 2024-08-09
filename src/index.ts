import express, { Express, Request, Response } from 'express'
import booksRouter from './routes/books'

const app: Express = express()
const port = 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello World!'
    })
})

app.use('/books', booksRouter)

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`)
})