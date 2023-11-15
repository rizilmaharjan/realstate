import { Request, Response } from "express"
import { signUpUser } from "../services"
export const signup = async(req:Request, res:Response)=>{
    try {
        const register = await signUpUser(req.body)
        if (register) {
            return res
              .status(register.status)
              .json({ message: register.message, user: register.userData });
          }
        
    } catch (error:any) {
        return res.status(400).json({message: error.message})
    
    }
}