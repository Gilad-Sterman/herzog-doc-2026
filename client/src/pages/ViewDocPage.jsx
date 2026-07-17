import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChapters } from '../store/slices/chaptersSlice'
import { toggleSidebar } from '../store/slices/uiSlice'
import { sortChapters, getAdjacentSubChapter } from '../utils/chapterSort'
import Sidebar from '../components/layout/Sidebar'
import TableOfContents from '../components/toc/TableOfContents'
import SubChapterReader from '../components/reader/SubChapterReader'
import ChapterReader from '../components/reader/ChapterReader'

export default function ViewDocPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { chapterNum, subNum } = useParams()
    const { list: chapters, loadedLang, loading, error } = useSelector((s) => s.chapters)
    const { lang, sidebarOpen } = useSelector((s) => s.ui)

    useEffect(() => {
        if (lang !== loadedLang) dispatch(fetchChapters(lang))
    }, [lang, loadedLang, dispatch])

    useEffect(() => {
        if (chapters.length === 0) return
        if (chapterNum && !subNum) {
            const sorted = sortChapters(chapters)
            const ch = sorted.find((c) => c.num === chapterNum)
            if (ch?.subChapters?.length > 0) {
                navigate(`/view/${chapterNum}/${ch.subChapters[0].num}`, { replace: true })
            }
        }
    }, [chapterNum, subNum, chapters, navigate])

    const sorted = sortChapters(chapters)
    const chapter = chapterNum ? sorted.find((c) => c.num === chapterNum) : null
    const subChapter = chapter && subNum ? chapter.subChapters?.find((s) => s.num === subNum) : null
    const isChapterWithoutSubs = chapter && !chapter.subChapters?.length
    const { prev, next } = chapter && (subChapter || isChapterWithoutSubs)
        ? getAdjacentSubChapter(chapters, chapterNum, subNum)
        : { prev: null, next: null }

    const showTOC = !chapterNum && chapters.length > 0

    return (
        <div className="view-doc-page">
            <Sidebar />

            {!sidebarOpen && (
                <button
                    className="sidebar-toggle"
                    onClick={() => dispatch(toggleSidebar())}
                    title="Open navigation"
                >
                    ☰
                </button>
            )}

            <div className="doc-content">
                {loading && <div className="loading-state">Loading…</div>}
                {error && <div className="loading-state">Error: {error}</div>}

                {!loading && showTOC && <TableOfContents chapters={chapters} />}

                {!loading && chapter && subChapter && (
                    <SubChapterReader
                        subChapter={subChapter}
                        chapter={chapter}
                        prev={prev}
                        next={next}
                    />
                )}

                {!loading && chapter && isChapterWithoutSubs && (
                    <ChapterReader
                        chapter={chapter}
                        prev={prev}
                        next={next}
                    />
                )}
            </div>
        </div>
    )
}
