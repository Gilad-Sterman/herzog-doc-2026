import InlineText from './InlineText'

function scrollToRef(num) {
    const el = document.querySelector(`[data-fnref="${num}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

export default function FootnoteList({ footnotes, activeNum }) {
    if (!footnotes || footnotes.length === 0) return null

    return (
        <aside className="footnote-list">
            <div className="footnote-divider" />
            <ol className="footnote-items">
                {footnotes.map((note, i) => (
                    <li
                        key={i}
                        id={`fn-${i + 1}`}
                        className={`footnote-item ${activeNum === i + 1 ? 'footnote-item--active' : ''}`}
                        onClick={() => scrollToRef(i + 1)}
                        title="Jump to reference in text"
                    >
                        <span className="footnote-num">{i + 1}.</span>
                        <span className="footnote-text">
                            <InlineText text={note} />
                        </span>
                    </li>
                ))}
            </ol>
        </aside>
    )
}
