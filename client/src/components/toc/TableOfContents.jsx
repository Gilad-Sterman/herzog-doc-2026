import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { sortChapters } from '../../utils/chapterSort'

export default function TableOfContents({ chapters }) {
    const navigate = useNavigate()
    const lang = useSelector((s) => s.ui.lang)
    const isHeb = lang === 'heb'

    const t = {
        title: isHeb ? 'תוכן עניינים' : 'Table of Contents',
        subtitle: isHeb
            ? 'עבודת הדוקטורט של הרב יצחק הרצוג על זהות התכלת — הצבע הכחול העתיק של התורה.'
            : 'Doctoral dissertation by Rabbi Isaac Herzog on the identity of Tekhelet, the ancient blue dye of the Torah.',
        chapters: isHeb ? 'פרקים' : 'Chapters',
        appendixes: isHeb ? 'נספחים' : 'Appendixes',
        chapter: isHeb ? 'פרק' : 'Chapter',
        appendix: isHeb ? 'נספח' : 'Appendix',
        sections: (n) => isHeb ? `${n} סעיפים` : `${n} sections`,
    }
    const sorted = sortChapters(chapters)

    function openChapter(chapter) {
        const firstSub = chapter.subChapters?.[0]
        const path = firstSub
            ? `/view/${chapter.num}/${firstSub.num}`
            : `/view/${chapter.num}`
        navigate(path)
    }

    function openSubChapter(chapterNum, subNum) {
        navigate(`/view/${chapterNum}/${subNum}`)
    }

    const regularChapters = sorted.filter((c) => !isNaN(Number(c.num)))
    const appendixes = sorted.filter((c) => isNaN(Number(c.num)))

    return (
        <div className="toc">
            <header className="toc-header">
                <h2>{t.title}</h2>
                <p>{t.subtitle}</p>
            </header>

            <section className="toc-section">
                <h3 className="toc-section-label">{t.chapters}</h3>
                <ol className="toc-list">
                    {regularChapters.map((ch) => (
                        <li key={ch.num} className="toc-chapter">
                            <button className="toc-chapter-btn" onClick={() => openChapter(ch)}>
                                <span className="toc-num">{t.chapter} {ch.num}</span>
                                <span className="toc-title">{ch.title}</span>
                                {ch.subChapters?.length > 0 && (
                                    <span className="toc-sub-count">{t.sections(ch.subChapters.length)}</span>
                                )}
                            </button>
                            {ch.subChapters?.length > 0 && (
                                <ol className="toc-sub-list">
                                    {ch.subChapters.map((sub) => (
                                        <li key={sub.num}>
                                            <button
                                                className="toc-sub-btn"
                                                onClick={() => openSubChapter(ch.num, sub.num)}
                                            >
                                                <span className="toc-num">{sub.num}</span>
                                                <span className="toc-title">{sub.title}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </li>
                    ))}
                </ol>
            </section>

            {appendixes.length > 0 && (
                <section className="toc-section">
                    <h3 className="toc-section-label">{t.appendixes}</h3>
                    <ol className="toc-list">
                        {appendixes.map((ch) => (
                            <li key={ch.num} className="toc-chapter">
                                <button className="toc-chapter-btn" onClick={() => openChapter(ch)}>
                                    <span className="toc-num">{t.appendix} {ch.num}</span>
                                    <span className="toc-title">{ch.title}</span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </section>
            )}
        </div>
    )
}
