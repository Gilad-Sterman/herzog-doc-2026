import InlineText from './InlineText'

export default function FootnoteList({ footnotes, activeNum, onFootnoteClick }) {
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
                    >
                        <span className="footnote-num">{i + 1}.</span>
                        <span className="footnote-text">
                            <InlineText text={note} onFootnoteClick={onFootnoteClick} />
                        </span>
                    </li>
                ))}
            </ol>
        </aside>
    )
}
