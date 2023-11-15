import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { deleteUser, updateUser } from "./controller";
const router = Router()

const routes = ()=>{
    router.put("/v1/users/:id",verifyToken,updateUser)
    router.delete("/users/:id",verifyToken,deleteUser)
    return router
    
}
export default routes