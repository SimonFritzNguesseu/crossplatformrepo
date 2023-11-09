import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from './api/usersApi'
//import { postsApi } from './api/postsApi'
import authSlice from './slices/authSlice'

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        //[postsApi.reducerPath]: postsApi.reducer, // <-- lägg till
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            usersApi.middleware,
            //postsApi.middleware // <-- lägg till
        )
})

setupListeners(store.dispatch)
