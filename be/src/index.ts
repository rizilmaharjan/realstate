import 'dotenv/config'
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
app.use(bodyParser.json())









app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:8000`);
})
