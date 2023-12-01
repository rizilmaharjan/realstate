import { Listing } from "../../models/listing.model";
export const createListings = async (values: Record<string, any>) => {
  try {
    const listing = new Listing(values);
    const saveListing = await listing.save();
    return {
      status: 201,
      message: "Listing saved successfully",
      listingData: saveListing,
    };
  } catch (error: any) {
    return error;
  }
};
export const getListings = async (id: string) => {
  try {
    const listings = await Listing.find({ userRef: id });
    return {
      status: 200,
      message: "Listings fetched successfully",
      listingData: listings,
    };
  } catch (error: any) {
    return error;
  }
};
export const deleteListing = async (id: string, decodedId: string) => {
  try {
    const listing = await Listing.findById(id);
    if (!listing) return { status: 404, message: "Listing does not exist" };
    if (listing?.userRef !== decodedId)
      return { status: 401, message: "You can only delete your own listing" };

    const deleteListing = await Listing.findByIdAndDelete(id);
    return { status: 200, message: "Listing deleted successfully" };
  } catch (error: any) {
    return error;
  }
};
export const updateListing = async (
  id: string,
  decodedId: string,
  values: Record<string, any>
) => {
  try {
    const listing = await Listing.findById(id);
    if (!listing) return { status: 404, message: "Listing does not exist" };
    if (listing?.userRef !== decodedId)
      return { status: 401, message: "You can only update your own listing" };

    const updateListing = await Listing.findByIdAndUpdate(id, values, {
      new: true,
    });
    return {
      status: 200,
      message: "Listing updated successfully",
      listingData: updateListing,
    };
  } catch (error: any) {
    return error;
  }
};
export const getIndividualListing = async (id: string) => {
  try {
    const listing = await Listing.findById(id);
    if (!listing) return { status: 404, message: "Listing does not exist" };

    const fetchSpecificListing = await Listing.findById(id);
    return {
      status: 200,
      message: "Listing updated successfully",
      listingData: fetchSpecificListing,
    };
  } catch (error: any) {
    return error;
  }
};
export const getAllListings = async (limit:number, startIndex:number, offer:boolean, furnished:boolean, type:string[], parking:boolean, searchTerm:string, sort:any, order:any) => {
  try {
    const listing = await Listing.find({
      name: {$regex: searchTerm, $options: "i"},
      offer,
      furnished,
      parking,
      type
    }).sort(
      {[sort]: order}
    ).limit(limit).skip(startIndex)
    if (!listing) return { status: 404, message: "Listing does not exist", listingData: listing };

    return {
      status: 200,
      message: "Listing updated successfully",
      listingData: listing,
    };
  } catch (error: any) {
    return error;
  }
};
