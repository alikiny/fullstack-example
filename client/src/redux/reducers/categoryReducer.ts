import { createSlice } from "@reduxjs/toolkit"

import { Category } from "../../types/categories"

const initialState: Category[] = []

const categorySlice = createSlice({
    name: "categoryReducer",
    initialState: initialState,
    reducers: {},
    extraReducers: (build) => {

    }
})

export default categorySlice.reducer