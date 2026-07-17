import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { closeSidebar } from '../../store/slices/uiSlice'
import { sortChapters } from '../../utils/chapterSort'
import { useState } from 'react'

export default function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { chapterNum, subNum } = useParams()
    const { sidebarOpen, lang } = useSelector((s) => s.ui)
    const { list: chapters } = useSelector((s) => s.chapters)
    const sorted = sortChapters(chapters)
    const [expandedChapters, setExpandedChapters] = useState({})

    function toggleChapter(num) {
        setExpandedChapters((prev) => ({ ...prev, [num]: !prev[num] }))
    }

    function goTo(path) {
        navigate(path)
        dispatch(closeSidebar())
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={() => dispatch(closeSidebar())} />
            )}

            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>{lang === 'heb' ? 'תוכן עניינים' : 'Contents'}</h3>
                    <button className="btn-close" onClick={() => dispatch(closeSidebar())}>✕</button>
                </div>

                <ul className="chapter-list">
                    {sorted.map((ch) => {
                        const isCurrentChapter = ch.num === chapterNum
                        const hasSubs = ch.subChapters?.length > 0
                        const isExpanded = expandedChapters[ch.num] ?? isCurrentChapter

                        return (
                            <li key={ch.num} className={`chapter-item ${isCurrentChapter ? 'active' : ''}`}>
                                <div className="chapter-row">
                                    <button
                                        className="chapter-title-btn"
                                        onClick={() => {
                                            if (hasSubs) {
                                                toggleChapter(ch.num)
                                                const firstSub = ch.subChapters[0]
                                                goTo(`/view/${ch.num}/${firstSub.num}`)
                                            } else {
                                                goTo(`/view/${ch.num}`)
                                            }
                                        }}
                                    >
                                        <span className="ch-num">{isNaN(Number(ch.num)) ? `App. ${ch.num}` : `Ch. ${ch.num}`}</span>
                                        <span className="ch-title">{ch.title}</span>
                                    </button>
                                    {hasSubs && (
                                        <button className="expand-btn" onClick={() => toggleChapter(ch.num)}>
                                            {isExpanded ? '▾' : '▸'}
                                        </button>
                                    )}
                                </div>

                                {hasSubs && isExpanded && (
                                    <ul className="sub-list">
                                        {ch.subChapters.map((sub) => {
                                            const isActiveSub = isCurrentChapter && sub.num === subNum
                                            return (
                                                <li key={sub.num}>
                                                    <button
                                                        className={`sub-btn ${isActiveSub ? 'active' : ''}`}
                                                        onClick={() => goTo(`/view/${ch.num}/${sub.num}`)}
                                                    >
                                                        <span className="sub-num">{sub.num}</span>
                                                        <span className="sub-title">{sub.title}</span>
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </aside>
        </>
    )
}
