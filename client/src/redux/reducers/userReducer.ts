import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios/instance"

import {User} from "../../types/users"

const initialState: {
    users: User[],
    currentUser: User|undefined
} = {
    users: [],
    currentUser: undefined
}

const fetchAll = createAsyncThunk(
    "fetAll",
    async (token: string)=>{
        const response = await axios.get("users", {
            headers: {
               "Authorization": `Bearer ${token}`
            }
        })
        return response.data
    }
)

const userSlice = createSlice({
    name: "userReducer",
    initialState: initialState,
    reducers: {},
    extraReducers: (build) => {

    }
})

export default userSlice.reducer