import express from "express";
import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProductById
}
from "../Controller/ProductController.js"

// creating a router
const productRouter = express.Router();

productRouter.get('/',getAllProducts);
productRouter.get('/:id',getProductById);
productRouter.post('/addProduct',addProduct);
productRouter.delete('/:id',deleteProductById);
productRouter.patch('/:id',updateProduct);

export default productRouter;