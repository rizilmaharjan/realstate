import { AnyObject } from "mongoose"
import { createListings } from "../Repository"

export const formulateListings = async(values:Record<string,any>)=>{
    try {
        const response = await createListings(values)
        return response
        
    } catch (error:any) {
        return error
        
    }
}