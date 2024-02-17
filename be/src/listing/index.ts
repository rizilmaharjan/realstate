import { Router } from "express";
import { createListings, deleteListing, getAllListings, getAllistings, getIndividualListing, updateListing } from "./controller";
import { verifyToken } from "../middlewares/verifyToken";
const router = Router()

const routes = ()=>{
    router.post("/v1/listing/create", verifyToken, createListings)
    // get all listings of signed in user
    router.get("/v1/listing/all", verifyToken, getAllListings)
    router.delete("/v1/listing/:id", verifyToken, deleteListing)
    router.post("/v1/listing/:id", verifyToken, updateListing)
    router.get("/v1/listing/:id", getIndividualListing)
    // get all available listings
    router.get("/v1/listing", getAllistings)
    return router
}

export default routes