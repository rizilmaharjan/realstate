import 'dotenv/config'
import express from "express"
import cors from "cors"
import bodyparser from "body-parser"
import { connectDB } from '../config/dbConnect'
import cookieParser from 'cookie-parser'


import authRoutes from "./auth/index"
import userRoutes from "./user/index"
import listingRoutes from "./listing/index"


const PORT = process.env.PORT || 8000

connectDB()
const app = express()
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(bodyparser.json())
app.use(cookieParser())
app.use("/api", authRoutes())
app.use("/api", userRoutes())
app.use("/api", listingRoutes())









app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:8000`);
})
