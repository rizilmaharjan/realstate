import { Listing } from "../../models/listing.model"
export const createListings = async(values:Record<string,any>)=>{
    try {
        const listing = new Listing(values)
        const saveListing = await listing.save()
        return {status:201, message: "Listing saved successfully", listingData: saveListing}
        
    } catch (error:any) {
        return error
        
    }
}
export const getListings = async(id:string, decodedId:string)=>{
    if(id !== decodedId) return {status: 401, message: "You can only view your own listings"}
    try {
        const listings = await Listing.find({userRef:id})
        return {status:200, message:"Listings fetched successfully", listingData: listings}


        
    } catch (error:any) {
        return error
        
    }
}
export const deleteListing = async(id:string, decodedId: string)=>{
    try {
        const listings = await Listing.findById(id)
        console.log(listings);
        if(listings?.userRef !== decodedId) return {status: 401, message: "You can only delete your own listing"}
        
        if(!listings) return {status: 404, message: "Listing does not exist"}

        const deleteListing = await Listing.findByIdAndDelete(id)
        return {status: 200, message:"Listing deleted successfully"}


        
    } catch (error:any) {
        return error
        
    }
}