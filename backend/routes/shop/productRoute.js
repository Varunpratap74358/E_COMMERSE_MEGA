import express from 'express'
import { getFilterProducts, getProductDetail } from '../../controllers/shop/product-controller.js'
const router = express.Router()

router.get('/get',getFilterProducts)
router.get('/get/:id',getProductDetail)


export default router