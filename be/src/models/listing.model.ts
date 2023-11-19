import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
    description:{
        type: String,
        required: [true, "description is required"]
    },
    address:{
        type:String,
        required: [true, "address is required"]
    },
    regularPrice:{
        type:Number,
        required: [true, "price is required"]
    },
    discountPrice:{
        type: Number,
        required: [true, "price is required"]

    },
    bathrooms:{
        type: Number,
        required: [true, "bathrooms is required"]
    },
    bedrooms:{
        type: Number,
        required: [true, "bedrooms is required"]
    },
    furnished:{
        type: Boolean,
        required: [true, "furnished is required"]
    },
    parking:{
        type: Boolean,
        required: [true, "parking is required"]
    },
    type:{
        type: [],
        required: [true, "type is required"]
    },
    offer:{
        type: Boolean,
        required: [true, "offer is required"]
    },
    imageUrls:{
        type: Array,
        required: [true, "imageUrls is required"]
    },
    userRef:{
        type: String,
        required: [true, "userRef is required"]
    }


},{
    timestamps: true
})


export const Listing = mongoose.model("Listing", listingSchema)