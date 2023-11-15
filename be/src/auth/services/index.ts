import { signup } from "../Repository"

export const signUpUser = async(values: Record<string,any>)=>{
    try {
        const response = await signup(values)
        return response
        
    } catch (error:any) {
        return error
        
    }
}