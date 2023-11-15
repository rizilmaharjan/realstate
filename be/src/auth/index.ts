import { Router } from "express";
import { google, signIn, signout, signup } from "./controller";
const router = Router()

const routes = ()=>{
    router.post("/v1/auth/signup", signup)
    router.post("/v1/auth/signin", signIn)
    router.post("/v1/auth/google", google)
    router.get("/v1/auth/signout", signout)
    return router
}

export default routes