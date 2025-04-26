import { Product } from "../../models/productsModel.js"


export const searchProduct = async(req,res)=>{
    try {
        const {keyword} = req.params;
        if(!keyword || typeof keyword !=='string'){
            return res.status(400).json({
                success:false,
                message:"Keyword is required and must be in string format."
            })
        }

        const regex = new RegExp(keyword,'i')
        const createSearchQuery = {
            $or:[
                {titlle:regex},
                {description:regex},
                {category:regex},
                {brand:regex},
            ]
        }

        const searchResult = await Product.find(createSearchQuery)

        res.status(200).json({
            success:false,
            data:searchResult
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error?.message || 'internal server error'
        })
    }
}