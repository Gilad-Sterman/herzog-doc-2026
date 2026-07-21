function parseInline(text) {
    if (!text) return []
    const segments = []
    const pattern = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[\^(\d+)\]/g
    let lastIndex = 0
    let match

    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            segments.push({ type: 'text', content: text.slice(lastIndex, match.index) })
        }
        if (match[1] !== undefined) {
            segments.push({ type: 'bold', content: match[1] })
        } else if (match[2] !== undefined) {
            segments.push({ type: 'italic', content: match[2] })
        } else if (match[3] !== undefined) {
            segments.push({ type: 'footnote', num: parseInt(match[3], 10) })
        }
        lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
        segments.push({ type: 'text', content: text.slice(lastIndex) })
    }
    return segments
}

function renderWithHighlight(content, highlight) {
    if (!highlight || !content) return content
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escaped})`, 'gi')
    const parts = content.split(regex)
    return parts.map((part, i) =>
        i % 2 === 1 ? <mark key={i}>{part}</mark> : part
    )
}

export default function InlineText({ text, onFootnoteClick, onFootnoteHover, highlight }) {
    if (!text) return null

    const paragraphs = text.split(/\n\n+/)

    return (
        <>
            {paragraphs.map((para, pi) => {
                const segments = parseInline(para)
                return (
                    <span key={pi} className="inline-para">
                        {pi > 0 && <><br /><br /></>}
                        {segments.map((seg, si) => {
                            if (seg.type === 'bold') return <strong key={si}>{renderWithHighlight(seg.content, highlight)}</strong>
                            if (seg.type === 'italic') return <em key={si}>{renderWithHighlight(seg.content, highlight)}</em>
                            if (seg.type === 'footnote') return (
                                <sup
                                    key={si}
                                    className="footnote-ref"
                                    data-fnref={seg.num}
                                    onMouseEnter={(e) => onFootnoteHover?.(seg.num, e)}
                                    onMouseLeave={() => onFootnoteHover?.(null)}
                                    onClick={(e) => { e.stopPropagation(); onFootnoteClick?.(seg.num) }}
                                >
                                    {seg.num}
                                </sup>
                            )
                            return <span key={si}>{renderWithHighlight(seg.content, highlight)}</span>
                        })}
                    </span>
                )
            })}
        </>
    )
}
