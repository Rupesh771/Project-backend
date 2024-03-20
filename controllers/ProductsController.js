const Products = require('../models/ProductModel');
// Filter, sorting and paginating


const ProductsController = {
    getProducts: async(req, res) =>{
        try {
            const features = new APIfeatures(Products.find(), req.query)
            .filtering().sorting().paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) =>{
        try {
            let productimages = (req.file) ? req.file.filename:null;
            const {product_id, title, price, description, content, category} = req.body;
            if(!productimages) return res.status(400).json({msg: "No image upload"})

            const product = await Products.findOne({product_id})
            if(product)
                return res.status(400).json({msg: "This product already exists."})

            const newProduct = new Products({
                product_id, title, price, description, content, productimages, category
            })

            await newProduct.save()
            res.json({msg: "Created a product"})

        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    deleteProduct: async(req, res) =>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res) =>{
        try {
            const {title, price, description, content, productimages, category} = req.body;
            if(!productimages) return res.status(400).json({msg: "No image upload"});

            await Products.findOneAndUpdate({_id: req.params.id}, {
                title, price, description, content, productimages, category
            })

            res.json({msg: "Updated a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = ProductsController