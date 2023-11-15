import { createSlice } from "@reduxjs/toolkit";

type TCurrentUser = {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    createdAt: string;
    updatedAt: string
    _id: string
}
const initialState = {
    currentUser: null as TCurrentUser | null,
    loading: false,
    error: false,
    errMsg: ""
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading = true
        },

        signInSuccess: (state,action)=>{

            state.currentUser = action.payload,
            state.loading = false,
            state.error = false,
            state.errMsg = ""
        },
        signInFailure: (state,action)=>{
            state.currentUser = null,
            state.loading = false,
            state.error = true,
            state.errMsg = action.payload
        }
    }
})

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions
export default userSlice.reducer