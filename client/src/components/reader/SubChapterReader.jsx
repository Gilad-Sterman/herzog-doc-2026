import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlockRenderer from './BlockRenderer'
import FootnoteList from './FootnoteList'
import OrgPdfPanel from './OrgPdfPanel'

export default function SubChapterReader({ subChapter, chapter, prev, next, highlight }) {
    const navigate = useNavigate()
    const lang = useSelector((s) => s.ui.lang)
    const isHeb = lang === 'heb'
    const [activeFootnote, setActiveFootnote] = useState(null)
    const tooltipRef = useRef(null)
    const leaveTimer = useRef(null)

    const handleFootnoteHover = useCallback((num, e) => {
        clearTimeout(leaveTimer.current)
        if (num === null) {
            leaveTimer.current = setTimeout(() => setActiveFootnote(null), 200)
            return
        }
        const rect = e.target.getBoundingClientRect()
        setActiveFootnote({
            num,
            text: subChapter.footNotes?.[num - 1] || '',
            x: rect.left + window.scrollX,
            y: rect.bottom + window.scrollY + 6,
        })
    }, [subChapter])

    const handleFootnoteClick = useCallback((num) => {
        const el = document.getElementById(`fn-${num}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [])

    function navigateTo(target) {
        if (!target) return
        const path = target.subNum
            ? `/view/${target.chapterNum}/${target.subNum}`
            : `/view/${target.chapterNum}`
        navigate(path)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <article className="subchapter-reader">
            <header className="subchapter-header">
                <span className="subchapter-num">{subChapter.num}</span>
                <h3 className="subchapter-title">{subChapter.title}</h3>
                <p className="chapter-context">{chapter.title}</p>
                <OrgPdfPanel orgPdfs={subChapter.orgPdfs} />
            </header>

            <div className="subchapter-body">
                {(subChapter.txt || []).map((block, i) => (
                    <BlockRenderer
                        key={i}
                        block={block}
                        onFootnoteClick={handleFootnoteClick}
                        onFootnoteHover={handleFootnoteHover}
                        lang={isHeb ? 'heb' : 'eng'}
                        highlight={highlight}
                    />
                ))}
            </div>

            <FootnoteList
                footnotes={subChapter.footNotes}
                activeNum={activeFootnote?.num}
            />

            <nav className="subchapter-nav">
                <button
                    className="nav-btn nav-btn--prev"
                    onClick={() => navigateTo(prev)}
                    disabled={!prev}
                >
                    {isHeb ? '→ הקודם' : '← Previous'}
                </button>
                <button
                    className="nav-btn nav-btn--next"
                    onClick={() => navigateTo(next)}
                    disabled={!next}
                >
                    {isHeb ? 'הבא ←' : 'Next →'}
                </button>
            </nav>

            {activeFootnote && (
                <div
                    ref={tooltipRef}
                    className="footnote-tooltip"
                    style={{ top: activeFootnote.y, left: Math.min(activeFootnote.x, window.innerWidth - 340) }}
                    onMouseEnter={() => clearTimeout(leaveTimer.current)}
                    onMouseLeave={() => setActiveFootnote(null)}
                >
                    <span className="tooltip-num">{activeFootnote.num}.</span>
                    <span className="tooltip-text">{activeFootnote.text}</span>
                </div>
            )}
        </article>
    )
}
