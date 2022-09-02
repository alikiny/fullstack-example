import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import axios from "../../axios/instance"

import { FetchAllProductsQuery, Product, UpdateProductParams } from "../../types/products"

const initialState: Product[] = []

export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts",
    async ({ categories, cities, page, limit, sort }: Partial<FetchAllProductsQuery>): Promise<Product[]> => {
        const response = await axios.get("products", {
            params: {
                categories, cities, page, limit, sort
            }
        })
        return response.data
    }
)

export const addProduct = createAsyncThunk(
    "addProduct",
    async (product: Partial<Product>): Promise<Product> => {
        const response = await axios.post("products", product)
        return response.data
    }
)

export const updateProduct = createAsyncThunk(
    "updateProduct",
    async ({ _id, update }: UpdateProductParams): Promise<Product> => {
        const response = await axios.patch(`products/${_id}`, update)
        return response.data
    }
)

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (_id: string): Promise<Product> => {
        const response = await axios.delete(`products/${_id}`)
        return response.data
    }
)

const productSlice = createSlice({
    name: "productReducer",
    initialState: initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state = [...action.payload]
        })
    }
})

export default productSlice.reducer