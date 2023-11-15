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
        },
        updateUserStart: (state)=>{
            state.loading = true
        },
        updateUserSuccess: (state, action)=>{
            state.currentUser = action.payload
            state.loading = false
            state.error = false
            state.errMsg = ""
        },
        updateUserFailure: (state, action)=>{
            state.loading = false
            state.error = true
            state.errMsg = action.payload
        },
        deleteUserStart: (state)=>{
            state.loading = true
        },
        deleteUserSuccess: (state)=>{
            state.currentUser = null
            state.loading = false
            state.error = false
            state.errMsg = ""
        },
        deleteUserFailure: (state,action)=>{
            state.loading = false
            state.error = true
            state.errMsg = action.payload
        },
        signOut: (state)=>{
            state.currentUser = null
            state.loading = false
            state.errMsg = ""
            state.error = false
        }
    }
})

export const {signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOut } = userSlice.actions
export default userSlice.reducer