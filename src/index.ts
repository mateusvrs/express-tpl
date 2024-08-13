import express, { Express, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import booksRouter from '@/routes/books'
import path from 'path'
import fs from 'fs'

const app: Express = express()
const port = 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello World!'
    })
})

app.use('/books', booksRouter)

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '../src', 'swagger.json'), 'utf8'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found'
    })
})

export default app.listen(port)