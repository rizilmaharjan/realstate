import { Router } from "express";
import { createListings, deleteListing, getListings } from "./controller";
import { verifyToken } from "../middlewares/verifyToken";
const router = Router()

const routes = ()=>{
    router.post("/v1/listing/create", verifyToken, createListings)
    router.get("/v1/listing/:id", verifyToken, getListings)
    router.delete("/v1/listing/:id", verifyToken, deleteListing)
    return router
}

export default routes