import { deleteUser, updateUser } from "../Repository"
export const updateIndividualUser = async(id:string, decodedId: string, values: Record<string, any> )=>{
    try {
        const response = await updateUser(id, decodedId, values)
        return response
        
    } catch (error:any) {
        return error
        
    }
}

export const deleteIndividualUser = async(id:string, decodedId: string)=>{
    try {
        const response = await deleteUser(id, decodedId)
        return response
        
    } catch (error:any) {
        return error
        
    }
}