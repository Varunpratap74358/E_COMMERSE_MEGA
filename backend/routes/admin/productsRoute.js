import express from 'express'
import { upload } from '../../helpers/cloudinary.js'
import { addProduct, deleteProduct, editProduct, fetchAllProducts, handelImageUpload } from '../../controllers/admin/productsConroller.js'

const router = express.Router()

router.post('/upload-image',upload.single('my_file'),handelImageUpload)
router.post('/add',addProduct)
router.get('/get',fetchAllProducts)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)

export default router