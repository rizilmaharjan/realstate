import { Router } from "express";
import { createListings, deleteListing, getListings, updateListing } from "./controller";
import { verifyToken } from "../middlewares/verifyToken";
const router = Router()

const routes = ()=>{
    router.post("/v1/listing/create", verifyToken, createListings)
    router.get("/v1/listing/:id", verifyToken, getListings)
    router.delete("/v1/listing/:id", verifyToken, deleteListing)
    router.post("/v1/listing/:id", verifyToken, updateListing)
    return router
}

export default routes