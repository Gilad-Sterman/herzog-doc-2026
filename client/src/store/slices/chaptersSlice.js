import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { chapterService } from '../../services/chapter.service'

export const fetchChapters = createAsyncThunk(
    'chapters/fetchAll',
    async (lang, { rejectWithValue }) => {
        try {
            return await chapterService.getChapters(lang)
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const fetchChapter = createAsyncThunk(
    'chapters/fetchOne',
    async ({ num, lang }, { rejectWithValue }) => {
        try {
            return await chapterService.getChapter(num, lang)
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

const chaptersSlice = createSlice({
    name: 'chapters',
    initialState: {
        list: [],
        loadedLang: null,
        current: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCurrent(state) {
            state.current = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChapters.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchChapters.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
                state.loadedLang = action.meta.arg
            })
            .addCase(fetchChapters.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchChapter.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchChapter.fulfilled, (state, action) => {
                state.loading = false
                state.current = action.payload
            })
            .addCase(fetchChapter.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { clearCurrent } = chaptersSlice.actions
export default chaptersSlice.reducer
