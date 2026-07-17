import { configureStore } from '@reduxjs/toolkit'
import chaptersReducer from './slices/chaptersSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
    reducer: {
        chapters: chaptersReducer,
        ui: uiReducer,
    },
})
