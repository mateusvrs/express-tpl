import express, { Router } from "express"
import { listBooks, createBook, updateBook, deleteBook } from "@/controllers/books"

const router: Router = express.Router()

router.get("/", async (req, res) => await listBooks(req, res))
router.post("/", async (req, res) => await createBook(req, res))
router.put("/:id", async (req, res) => await updateBook(req, res))
router.delete("/:id", async (req, res) => await deleteBook(req, res))

export default router