import express from 'express'
import { searchProduct } from '../../controllers/shop/searchController.js'

const router = express.Router()

router.get('/:keyword',searchProduct)

export default router