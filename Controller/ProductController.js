import { productModel } from "../Model/ProductModel.js";
import mongoose from "mongoose";

// Implementing CRUD operations with the ProductModel

// Create a product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, vendor } =
      await req.body;

    if (name && description && price && stock && category && vendor) {
      // check for existing user and save it
      const productExists = await productModel.exists({
        name: name,
        vendor: vendor,
      });
      if (!productExists) {
        const newProduct = new productModel({
          name: name,
          description: description,
          price: price,
          stock: stock,
          category: category,
          vendor: vendor,
        });
        await newProduct.save().then((product) => {
          return res.status(201).send({
            success: true,
            message: "Product created successfully",
            newProduct,
          });
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Product Already Exists",
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "Enter all fields",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error adding Product",
      error,
    });
  }
};

// Read all Product
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    return res.status(200).send({
      success: true,
      message: "All products",
      products,
    });
  } catch (error) {
    res.status(500).send({
        success:false,
        message:"Error displaying products",
        error
    })
  }
};

// Read product by Id
export const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
    
        return res.status(200).send({
          success: true,
          message: "Product Details",
          product,
        });
      } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error fetching product",
            error
        })
      }
};

// Update product by Id
export const updateProduct = async (req, res) => {
    try {
        const { field, value } = req.body;

        if (field && value) {
            const product = await productModel.findByIdAndUpdate(
                req.params.id,
                { [field]: value },  // Dynamically set the field to be updated
                { new: true } // Ensure that the updated product is returned
            );

            if (!product) {
                return res.status(404).send({
                    success: false,
                    message: "Product not found"
                });
            }

            return res.status(200).send({
                success: true,
                message: "Product updated successfully",
                product
            });
        } else {
            return res.status(400).send({
                success: false,
                message: "Enter all fields"
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error updating product",
            error
        });
    }
};


// Delete product by Id
export const deleteProductById = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found"
            });
        }
        
        return res.status(200).send({
            success: true,
            message: "Deleted product successfully"
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error deleting the product",
            error
        });
    }
};

