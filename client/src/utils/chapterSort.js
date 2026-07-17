export function sortChapters(chapters) {
    return [...chapters].sort((a, b) => {
        const isAlphaA = isNaN(Number(a.num))
        const isAlphaB = isNaN(Number(b.num))
        if (isAlphaA && isAlphaB) return a.num.localeCompare(b.num)
        if (isAlphaA) return 1
        if (isAlphaB) return -1
        return Number(a.num) - Number(b.num)
    })
}

export function getAdjacentSubChapter(chapters, chapterNum, subNum) {
    const sorted = sortChapters(chapters)
    const chIdx = sorted.findIndex((c) => c.num === chapterNum)
    if (chIdx === -1) return { prev: null, next: null }

    const chapter = sorted[chIdx]
    const subs = chapter.subChapters || []

    if (subs.length === 0) {
        return {
            prev: chIdx > 0 ? { chapterNum: sorted[chIdx - 1].num, subNum: null } : null,
            next: chIdx < sorted.length - 1 ? { chapterNum: sorted[chIdx + 1].num, subNum: null } : null,
        }
    }

    const subIdx = subs.findIndex((s) => s.num === subNum)

    const prevSub = subIdx > 0
        ? { chapterNum, subNum: subs[subIdx - 1].num }
        : chIdx > 0
            ? { chapterNum: sorted[chIdx - 1].num, subNum: (sorted[chIdx - 1].subChapters?.slice(-1)[0]?.num || null) }
            : null

    const nextSub = subIdx < subs.length - 1
        ? { chapterNum, subNum: subs[subIdx + 1].num }
        : chIdx < sorted.length - 1
            ? { chapterNum: sorted[chIdx + 1].num, subNum: (sorted[chIdx + 1].subChapters?.[0]?.num || null) }
            : null

    return { prev: prevSub, next: nextSub }
}
