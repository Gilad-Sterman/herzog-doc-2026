// syncSrc.js
// Reads from src collections and syncs prose text + footnotes into the display collections.
//
// Rules:
//   - Prose text (txt / txtTrans) is taken from src
//   - Italic/bold markup in display is detected and re-applied after any change
//   - Original language fields (txtOrg, txtOrgLang) are NEVER touched
//   - img blocks are NEVER touched
//   - orgPdfs are NEVER touched
//   - If src and display are already in sync, the document is skipped
//
// Usage:
//   node prodScripts/syncSrc.js               # sync both languages
//   node prodScripts/syncSrc.js --dry-run     # preview changes without writing
//   node prodScripts/syncSrc.js --lang eng    # English only
//   node prodScripts/syncSrc.js --lang heb    # Hebrew only

import { MongoClient } from 'mongodb'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const DB_URL  = process.env.DB_URL
const DB_NAME = process.env.DB_NAME || 'herzog_dev'

const DRY_RUN = process.argv.includes('--dry-run')
const LANG_ARG = (() => {
    const idx = process.argv.indexOf('--lang')
    return idx !== -1 ? process.argv[idx + 1] : null
})()

// ── Text helpers ─────────────────────────────────────────────────────────────

// Strip *italic*, _italic_, **bold** — keeps [^N] refs intact
function stripMarkdown(txt) {
    if (!txt) return ''
    return txt
        .replace(/\*\*([^*\n]+)\*\*/g, '$1')
        .replace(/\*([^*\n]+)\*/g, '$1')
        .replace(/_([^_\n]+)_/g, '$1')
}

// Collapse internal double newlines so comparisons against sanitized src text stay correct
function sanitizeInternal(txt) {
    return (txt || '').replace(/\n{2,}/g, '\n')
}

// Extract all markup spans {marker, word} from a display string
function extractMarkupSpans(txt) {
    if (!txt) return []
    const spans = []
    const regex = /(\*{1,2}|_{1,2})([^\n*_]+?)\1/g
    let m
    while ((m = regex.exec(txt)) !== null) {
        spans.push({ marker: m[1], word: m[2] })
    }
    return spans
}

// Merge srcTxt (plain prose from src collection) into displayTxt (markup-annotated from display collection).
// - If the underlying prose is unchanged, returns displayTxt unmodified (markup preserved perfectly).
// - If the prose changed, applies srcTxt and re-applies any known markup words by whole-word match.
function smartMerge(displayTxt, srcTxt) {
    if (!displayTxt && !srcTxt) return ''
    if (!displayTxt) return srcTxt

    const spans = extractMarkupSpans(displayTxt)
    const cleanDisplay = sanitizeInternal(stripMarkdown(displayTxt))

    // Nothing changed — return original with all markup intact
    if (cleanDisplay === srcTxt) return displayTxt

    // Prose changed — start from srcTxt and re-apply known markup words
    let result = srcTxt
    for (const { marker, word } of spans) {
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        // Match the word only when not already wrapped in markup chars
        const regex = new RegExp(`(?<![*_])\\b${escaped}\\b(?![*_])`, 'g')
        result = result.replace(regex, `${marker}${word}${marker}`)
    }
    return result
}

// ── Block merging ─────────────────────────────────────────────────────────────

function mergeBlock(block, srcText, blockType) {
    switch (blockType) {
        case 'img':
            return { newBlock: block, changed: false }

        case 'regular':
        case 'hebrew':
        case 'title': {
            const merged = smartMerge(block.txt, srcText)
            return { newBlock: { ...block, txt: merged }, changed: merged !== block.txt }
        }

        case 'translation':
        case 'tripleTranslation': {
            const merged = smartMerge(block.txtTrans, srcText)
            return { newBlock: { ...block, txtTrans: merged }, changed: merged !== block.txtTrans }
        }

        case 'translationList': {
            const srcItems = srcText.split(' | ')
            let changed = false
            const newTrans = (block.txtTrans || []).map((orig, j) => {
                const merged = smartMerge(orig, srcItems[j] || '')
                if (merged !== orig) changed = true
                return merged
            })
            return { newBlock: { ...block, txtTrans: newTrans }, changed }
        }

        case 'list': {
            const srcItems = srcText.split(' | ')
            let changed = false
            const newItems = (block.txt || []).map((orig, j) => {
                const merged = smartMerge(orig, srcItems[j] || '')
                if (merged !== orig) changed = true
                return merged
            })
            return { newBlock: { ...block, txt: newItems }, changed }
        }

        default:
            return { newBlock: block, changed: false }
    }
}

function mergeBlockArray(displayBlocks, srcParagraphs, blockTypes) {
    let anyChanged = false
    const newBlocks = displayBlocks.map((block, i) => {
        const { newBlock, changed } = mergeBlock(block, srcParagraphs[i] || '', blockTypes[i])
        if (changed) anyChanged = true
        return newBlock
    })
    return { newBlocks, anyChanged }
}

// ── Per-document sync ─────────────────────────────────────────────────────────

async function syncDoc(displayColl, srcDoc) {
    const { chapterNum, subNum, body, footNotes, blockTypes } = srcDoc
    const key = subNum ? `${chapterNum}/${subNum}` : `${chapterNum} (flat)`

    const displayChapter = await displayColl.findOne({ num: chapterNum })
    if (!displayChapter) return { status: 'missing_chapter', key }

    const srcParagraphs = body.split('\n\n')

    // Resolve which blocks and footnotes to target
    let displayBlocks, displayFootNotes

    if (subNum) {
        const sub = (displayChapter.subChapters || []).find(s => s.num === subNum)
        if (!sub) return { status: 'missing_sub', key }
        displayBlocks    = sub.txt || []
        displayFootNotes = sub.footNotes || []
    } else {
        displayBlocks    = displayChapter.text || []
        displayFootNotes = displayChapter.footNotes || []
    }

    // Guard: length mismatches indicate structural drift — skip with warning
    if (srcParagraphs.length !== blockTypes.length) {
        return { status: 'mismatch', key, detail: `body has ${srcParagraphs.length} paragraphs but blockTypes has ${blockTypes.length}` }
    }
    if (srcParagraphs.length !== displayBlocks.length) {
        return { status: 'mismatch', key, detail: `src has ${srcParagraphs.length} blocks but display has ${displayBlocks.length}` }
    }

    // Merge text
    const { newBlocks, anyChanged } = mergeBlockArray(displayBlocks, srcParagraphs, blockTypes)

    // Check footnotes
    const fnChanged = JSON.stringify(footNotes) !== JSON.stringify(displayFootNotes)

    if (!anyChanged && !fnChanged) return { status: 'skipped', key }

    // Build updated chapter document
    const updatedChapter = { ...displayChapter }
    if (subNum) {
        updatedChapter.subChapters = displayChapter.subChapters.map(s =>
            s.num === subNum ? { ...s, txt: newBlocks, footNotes } : s
        )
    } else {
        updatedChapter.text      = newBlocks
        updatedChapter.footNotes = footNotes
    }

    if (!DRY_RUN) {
        await displayColl.replaceOne({ _id: displayChapter._id }, updatedChapter)
    }

    return { status: 'updated', key, anyChanged, fnChanged }
}

// ── Collection-level sync ─────────────────────────────────────────────────────

async function syncCollection(db, srcCollName, displayCollName, label) {
    console.log(`\n[${label}] ${srcCollName} → ${displayCollName}`)

    const srcColl     = db.collection(srcCollName)
    const displayColl = db.collection(displayCollName)

    const srcDocs = await srcColl.find({}).toArray()
    const stats = { updated: 0, skipped: 0, errors: 0 }

    for (const srcDoc of srcDocs) {
        const result = await syncDoc(displayColl, srcDoc)

        if (result.status === 'updated') {
            const tags = [
                result.anyChanged ? 'text' : null,
                result.fnChanged  ? 'footnotes' : null,
            ].filter(Boolean).join(' + ')
            console.log(`  ✓ ${result.key} [${tags}]${DRY_RUN ? ' (dry-run)' : ''}`)
            stats.updated++
        } else if (result.status === 'skipped') {
            stats.skipped++
        } else {
            console.warn(`  [WARN] ${result.status}: ${result.key}${result.detail ? ` — ${result.detail}` : ''}`)
            stats.errors++
        }
    }

    console.log(`  Summary — Updated: ${stats.updated} | Skipped: ${stats.skipped} | Errors: ${stats.errors}`)
    return stats
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
    if (!DB_URL) {
        console.error('DB_URL not set — check your .env file.')
        process.exit(1)
    }

    if (DRY_RUN) console.log('=== DRY RUN — no changes will be written ===')

    const client = await MongoClient.connect(DB_URL)
    const db = client.db(DB_NAME)

    try {
        if (!LANG_ARG || LANG_ARG === 'eng') {
            await syncCollection(db, 'herzog_chapters_src', 'herzog_chapters', 'English')
        }
        if (!LANG_ARG || LANG_ARG === 'heb') {
            await syncCollection(db, 'herzog_chapters_src_heb', 'herzog_chapters_heb', 'Hebrew')
        }
        console.log('\nDone.')
    } finally {
        await client.close()
    }
}

main().catch(err => { console.error(err); process.exit(1) })
