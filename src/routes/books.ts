import express, { Router } from "express"
import { listBooks, createBook, updateBook, deleteBook } from "@/controllers/books"

const router: Router = express.Router()

router.get("/", (req, res) => listBooks(req, res))
router.post("/", (req, res) => createBook(req, res))
router.put("/:id", (req, res) => updateBook(req, res))
router.delete("/:id", (req, res) => deleteBook(req, res))

export default router