import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        lang: 'en',
        sidebarOpen: false,
        orgPdfOpen: false,
        activeSubChapter: null,
    },
    reducers: {
        setLang(state, action) {
            state.lang = action.payload
        },
        toggleSidebar(state) {
            state.sidebarOpen = !state.sidebarOpen
        },
        closeSidebar(state) {
            state.sidebarOpen = false
        },
        toggleOrgPdf(state) {
            state.orgPdfOpen = !state.orgPdfOpen
        },
        closeOrgPdf(state) {
            state.orgPdfOpen = false
        },
        setActiveSubChapter(state, action) {
            state.activeSubChapter = action.payload
        },
    },
})

export const {
    setLang,
    toggleSidebar,
    closeSidebar,
    toggleOrgPdf,
    closeOrgPdf,
    setActiveSubChapter,
} = uiSlice.actions

export default uiSlice.reducer
