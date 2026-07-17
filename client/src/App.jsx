import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import ViewDocPage from './pages/ViewDocPage'
import SearchPage from './pages/SearchPage'

export default function App() {
    const lang = useSelector((s) => s.ui.lang)

    useEffect(() => {
        document.documentElement.dir = lang === 'heb' ? 'rtl' : 'ltr'
        document.documentElement.lang = lang === 'heb' ? 'he' : 'en'
    }, [lang])

    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="view" element={<ViewDocPage />} />
                <Route path="view/:chapterNum" element={<ViewDocPage />} />
                <Route path="view/:chapterNum/:subNum" element={<ViewDocPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}
