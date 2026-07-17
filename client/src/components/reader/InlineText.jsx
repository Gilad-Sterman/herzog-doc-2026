function parseInline(text) {
    if (!text) return []
    const segments = []
    const pattern = /\*([^*]+)\*|\[\^(\d+)\]/g
    let lastIndex = 0
    let match

    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            segments.push({ type: 'text', content: text.slice(lastIndex, match.index) })
        }
        if (match[1] !== undefined) {
            segments.push({ type: 'italic', content: match[1] })
        } else if (match[2] !== undefined) {
            segments.push({ type: 'footnote', num: parseInt(match[2], 10) })
        }
        lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
        segments.push({ type: 'text', content: text.slice(lastIndex) })
    }
    return segments
}

export default function InlineText({ text, onFootnoteClick }) {
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
                            if (seg.type === 'italic') return <em key={si}>{seg.content}</em>
                            if (seg.type === 'footnote') return (
                                <sup
                                    key={si}
                                    className="footnote-ref"
                                    onClick={(e) => onFootnoteClick?.(seg.num, e)}
                                    title={`Footnote ${seg.num}`}
                                >
                                    {seg.num}
                                </sup>
                            )
                            return <span key={si}>{seg.content}</span>
                        })}
                    </span>
                )
            })}
        </>
    )
}
