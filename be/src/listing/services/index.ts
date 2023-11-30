import { createListings, deleteListing, getIndividualListing, getListings, updateListing } from "../Repository"

export const formulateListings = async(values:Record<string,any>)=>{
    try {
        const response = await createListings(values)
        return response
        
    } catch (error:any) {
        return error
        
    }
}
export const fetchListings = async(id:string)=>{
    try {
        const response = await getListings(id)
        return response
        
    } catch (error:any) {
        return error
        
    }
}
export const removeListing = async(id:string, decodedId:string)=>{
    try {
        const response = await deleteListing(id, decodedId)
        return response
        
    } catch (error:any) {
        return error
        
    }
}
export const updateIndividualListing = async(id:string, decodedId:string, values:Record<string,any>)=>{
    try {
        const response = await updateListing(id, decodedId, values)
        return response
        
    } catch (error:any) {
        return error
        
    }
}
export const getSpecificListing = async(id:string)=>{
    try {
        const response = await getIndividualListing(id)
        return response
        
    } catch (error:any) {
        return error
        
    }
}