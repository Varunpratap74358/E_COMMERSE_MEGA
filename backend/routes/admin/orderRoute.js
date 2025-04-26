import express from 'express'
import { getAllOrdersOfAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '../../controllers/admin/orderController.js'
const router = express.Router()

router.get('/get',getAllOrdersOfAdmin)
router.get('/details/:id',getOrderDetailsForAdmin)
router.put('/update/:id',updateOrderStatus)

export default router