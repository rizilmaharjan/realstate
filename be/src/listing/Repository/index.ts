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