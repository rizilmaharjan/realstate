import 'dotenv/config'
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { connectDB } from '../config/dbConnect'

const PORT = process.env.PORT || 8000

connectDB()
const app = express()
app.use(cors())
app.use(bodyParser.json())









app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:8000`);
})
