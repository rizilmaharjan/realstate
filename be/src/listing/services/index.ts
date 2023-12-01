import { createListings, deleteListing, getAllListings, getIndividualListing, getListings, updateListing } from "../Repository"

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
export const fetchAllListings = async(query:Record<string,any>)=>{
    const limit = parseInt(query.limit) || 9;
    const startIndex = parseInt(query.startIndex) || 0;
    let offer = query.offer;
    if (offer === undefined || offer === false) {
      offer = { $in: [false, true] };
    }
    let furnished = query.furnished;
    if (furnished === undefined || furnished === false) {
      furnished = { $in: [false, true] };
    }
    let type = query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
    let parking = query.parking;
    if (parking === undefined || parking === false) {
      parking = { $in: [false, true] };
    }
    const searchTerm = query.searchTerm || ""
    const sort = query.sort || "createdAt"
    const order = query.order || "desc"
    try {

        const response = await getAllListings(limit, startIndex, offer, furnished, type, parking, searchTerm, sort, order)
        return response
        
    } catch (error:any) {
        return error
        
    }
}