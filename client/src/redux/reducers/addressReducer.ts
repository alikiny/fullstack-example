import { createSlice } from "@reduxjs/toolkit"

import { Address } from "../../types/addresses"

const initialState: {
    userAddress: Address[],
    addresses: Address[]
} = {
    userAddress: [],
    addresses: []
}

const addressSlice = createSlice({
    name: "addressReducer",
    initialState: initialState,
    reducers: {},
    extraReducers: (build) => {

    }
})

export default addressSlice.reducer