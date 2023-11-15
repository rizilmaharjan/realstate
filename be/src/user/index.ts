import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { updateUser } from "./controller";
const router = Router()

const routes = ()=>{
    router.put("/v1/users/:id",verifyToken,updateUser)
    return router
    
}
export default routes