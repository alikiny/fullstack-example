import { configureStore } from "@reduxjs/toolkit";

import addressReducer from "./reducers/addressReducer";
import cartReducer from "./reducers/cartReducer";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        userReducer,
        productReducer,
        cartReducer,
        categoryReducer,
        addressReducer
    }
})

export type RootState = ReturnType<typeof store.getState> //app state type
export type AppDispatch = typeof store.dispatch
export default store