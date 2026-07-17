import { sortChapters } from './chapterSort'

function getTextFromBlock(block) {
    const candidates = [block.txt, block.txtTrans, block.txtOrg]
    for (const c of candidates) {
        if (typeof c === 'string' && c.trim()) return c
        if (Array.isArray(c) && c.length) return c.join(' ')
    }
    return ''
}

function extractSnippet(blocks, regex) {
    for (const block of blocks || []) {
        const text = getTextFromBlock(block)
        if (!text) continue
        const match = text.search(regex)
        if (match === -1) continue
        const start = Math.max(0, match - 80)
        const end = Math.min(text.length, match + 140)
        return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '')
    }
    return null
}

function renderMarkdown(text) {
    if (!text) return ''
    return text
        .replace(/\[\^\d+\]/g, '')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

function highlightSnippet(snippet, query) {
    if (!snippet) return ''
    const rendered = renderMarkdown(snippet)
    return rendered.replace(
        new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
        '<mark>$1</mark>'
    )
}

export function processSearchResults(chapters, query) {
    if (!chapters?.length || !query) return []
    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    const results = []
    const sorted = sortChapters(chapters)

    for (const chapter of sorted) {
        const hasSubs = chapter.subChapters?.length > 0

        if (hasSubs) {
            for (const sub of chapter.subChapters) {
                const titleMatch = regex.test(sub.title)
                const snippet = extractSnippet(sub.txt, regex)
                    || (titleMatch ? sub.title : null)
                    || extractSnippet(sub.footNotes?.map(f => ({ txt: f })), regex)

                if (titleMatch || snippet) {
                    results.push({
                        chapterNum: chapter.num,
                        chapterTitle: chapter.title,
                        subNum: sub.num,
                        subTitle: sub.title,
                        snippet: highlightSnippet(snippet, query),
                        path: `/view/${chapter.num}/${sub.num}`,
                    })
                }
            }
        } else {
            const titleMatch = regex.test(chapter.title)
            const snippet = extractSnippet(chapter.text, regex)
                || (titleMatch ? chapter.title : null)

            if (titleMatch || snippet) {
                results.push({
                    chapterNum: chapter.num,
                    chapterTitle: chapter.title,
                    subNum: null,
                    subTitle: null,
                    snippet: highlightSnippet(snippet, query),
                    path: `/view/${chapter.num}`,
                })
            }
        }
    }

    return results
}
