import express from 'express'
import { addFeatureImage, getFeatureImages } from '../../controllers/comman/featureController.js'

const router = express.Router()

router.post('/add',addFeatureImage)// only for admin
router.get('/get',getFeatureImages)//only for user

export default router