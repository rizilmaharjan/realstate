import { updateUser } from "../Repository"
export const updateIndividualUser = async(id:string, decodedId: string, values: Record<string, any> )=>{
    try {
        const response = await updateUser(id, decodedId, values)
        return response
        
    } catch (error:any) {
        return error
        
    }
}