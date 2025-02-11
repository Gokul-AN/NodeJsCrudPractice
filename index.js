import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import productRouter from './Router/ProductRouter.js';

const app = express();

dotenv.config()

// declared for json data format
app.use(express.json());

// allowing all origins to access the backend
app.use(cors());

const port = process.env.PORT;

// declared for verifying the working of backend
app.get('/', (req, res) => {
    res.send("Welcome Back Chief!")
})

app.use('/products',productRouter)

// server
const server = http.createServer(app);

// connecting server to database and porting on localhost
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected");
        server.listen(port,() => {
            console.log(`App listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log(`Failed to connect to port ${err.message}`);
    })


