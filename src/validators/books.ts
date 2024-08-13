import { z } from "zod"

const BookCreateInput = z.object({
    title: z.string().trim().min(1),
    author: z.string().trim().min(1),
}).strict().required()

const BookUpdateInput = z.object({
    title: z.string().trim().min(1),
    author: z.string().trim().min(1),
}).strict().partial()

export { BookCreateInput, BookUpdateInput }