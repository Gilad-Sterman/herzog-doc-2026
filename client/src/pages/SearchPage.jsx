import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { searchService } from '../services/search.service'
import { processSearchResults } from '../utils/searchResults'

export default function SearchPage() {
    const lang = useSelector((s) => s.ui.lang)
    const isHeb = lang === 'heb'
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState('')

    const t = {
        title: isHeb ? 'חיפוש בעבודה' : 'Search the Dissertation',
        placeholder: isHeb ? 'חפש מונח, קטע או נושא…' : 'Search for a term, passage, or topic…',
        btn: isHeb ? 'חיפוש' : 'Search',
        loading: isHeb ? '…' : '…',
        empty: isHeb ? 'הזן מונח חיפוש למעלה.' : 'Enter a search term above.',
        noResults: (q) => isHeb ? `לא נמצאו תוצאות עבור "${q}".` : `No results found for "${q}".`,
        resultCount: (n) => isHeb ? `נמצאו ${n} תוצאות` : `${n} result${n === 1 ? '' : 's'} found`,
        goTo: isHeb ? 'עבור לסעיף ←' : 'Go to section →',
        chapter: isHeb ? 'פרק' : 'Chapter',
    }

    async function handleSearch(e) {
        e.preventDefault()
        if (!query.trim()) return
        setLoading(true)
        try {
            const raw = await searchService.search(query, lang)
            setResults(processSearchResults(raw, query))
            setSearched(query)
        } catch (err) {
            console.error('Search error:', err)
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="search-page">
            <div className="search-header">
                <h2>{t.title}</h2>
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder={t.placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? t.loading : t.btn}
                    </button>
                </form>
                {results !== null && !loading && (
                    <p className="result-count">{t.resultCount(results.length)}</p>
                )}
            </div>

            <div className="search-results">
                {results === null && !loading && (
                    <div className="empty-state">{t.empty}</div>
                )}
                {results !== null && results.length === 0 && !loading && (
                    <div className="empty-state">{t.noResults(searched)}</div>
                )}
                {results?.map((r, i) => (
                    <div key={i} className="result-card" onClick={() => navigate(r.path)}>
                        <div className="result-meta">
                            <span className="result-chapter">
                                {t.chapter} {r.chapterNum}
                                {r.subNum && <> · {r.subNum}</>}
                            </span>
                            <button className="result-goto">{t.goTo}</button>
                        </div>
                        <h3 className="result-title">{r.subTitle || r.chapterTitle}</h3>
                        {r.subTitle && <p className="result-chapter-context">{r.chapterTitle}</p>}
                        {r.snippet && (
                            <p
                                className="result-snippet"
                                dangerouslySetInnerHTML={{ __html: r.snippet }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
