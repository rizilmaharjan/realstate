import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already exists"]

    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists"]

    },
    password:{
        type: String,
        required: [true, "password is required"],

    },

    profilePicture:{
        type: String,
        default: "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
    }

},{
    timestamps: true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcryptjs.hash(this.password,12)
})

export const User = mongoose.model("User", userSchema)