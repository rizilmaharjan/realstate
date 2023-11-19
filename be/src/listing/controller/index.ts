import { Request, Response } from "express"
import { formulateListings } from "../services"
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