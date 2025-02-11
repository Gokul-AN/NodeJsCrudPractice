import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        stock:{
            type: Number,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        vendor:{
            type:String,
            required:'true'
        }
    },
    {
        timestamp: true,
    }
)

export const productModel = mongoose.model('Product',productSchema)