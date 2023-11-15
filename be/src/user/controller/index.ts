import { Request, Response } from "express"
import { updateIndividualUser } from "../services"
export const updateUser = async(req:Request, res:Response)=>{
    const {id} = req.params
    const {id: decodedId} = res.locals.user
    try {
        const response = await updateIndividualUser(id,decodedId, req.body )
        return res.status(response.status).json({message: response.message, user:response.userData})
        
    } catch (error) {
        return error
        
    }
}