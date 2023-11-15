import 'dotenv/config'
import express from "express"
import cors from "cors"
import bodyparser from "body-parser"
import { connectDB } from '../config/dbConnect'


import authRoutes from "./auth/index"

const PORT = process.env.PORT || 8000

connectDB()
const app = express()
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(bodyparser.json())
app.use("/api", authRoutes())









app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:8000`);
})
