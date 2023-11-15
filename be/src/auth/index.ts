import { Router } from "express";
import { signup } from "./controller";
const router = Router()

const routes = ()=>{
    router.post("/v1/auth/signup", signup)
    return router
}

export default routes