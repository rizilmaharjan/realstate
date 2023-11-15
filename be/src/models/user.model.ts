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

},{
    timestamps: true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcryptjs.hash(this.password,12)
})

export const User = mongoose.model("User", userSchema)