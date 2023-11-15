import { Router } from "express";
import { signIn, signup } from "./controller";
const router = Router()

const routes = ()=>{
    router.post("/v1/auth/signup", signup)
    router.post("/v1/auth/signin", signIn)
    return router
}

export default routes