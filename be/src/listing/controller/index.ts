import { Request, Response } from "express"
import { fetchListings, formulateListings, removeListing, updateIndividualListing } from "../services"
export const createListings = async(req:Request, res:Response)=>{
    try {
        const response = await formulateListings(req.body)
        console.log(response);
        if(response){
            return res.status(response.status).json({message: response.message, listingData: response.listingData})
        }
        
    } catch (error:any) {
        return error
        
    }
}

export const getListings = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const {id: decodedId} = res.locals.user
    try {
        const response = await fetchListings(id,decodedId)
        if(response){
            return res.status(response.status).json({message: response.message, listingData: response.listingData})
        }
        
    } catch (error:any) {
        return error
        
    }
}
export const deleteListing = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const {id: decodedId} = res.locals.user
    try {
        const response = await removeListing(id,decodedId)
        if(response){
            return res.status(response.status).json({message: response.message, listingData: response.listingData})
        }
        
    } catch (error:any) {
        return error
        
    }
}
export const updateListing = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const {id: decodedId} = res.locals.user
    try {
        const response = await updateIndividualListing(id,decodedId,req.body)
        if(response){
            return res.status(response.status).json({message: response.message, listingData: response.listingData})
        }
        
    } catch (error:any) {
        return error
        
    }
}