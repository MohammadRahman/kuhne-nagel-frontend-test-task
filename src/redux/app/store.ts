import { configureStore } from '@reduxjs/toolkit'
import ShipmentsSlice  from '../slices/shipments'

export const store = configureStore({
    reducer: {
        shipments: ShipmentsSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch