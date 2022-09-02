import { createSlice } from "@reduxjs/toolkit"

import { Cart } from "../../types/carts"

const initialState : {
    currentCart: Cart | undefined,
    carts: Cart[]
} = {
    currentCart: undefined,
    carts: []
}

const cartSlice = createSlice({
    name: "cartReducer",
    initialState: initialState,
    reducers: {},
    extraReducers: (build) => {

    }
})

export default cartSlice.reducer