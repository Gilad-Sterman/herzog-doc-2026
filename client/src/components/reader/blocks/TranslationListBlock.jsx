import { useState } from 'react'
import InlineText from '../InlineText'

export default function TranslationListBlock({ block, onFootnoteClick, onFootnoteHover, lang, highlight }) {
    const [showOriginal, setShowOriginal] = useState(false)
    const trans = Array.isArray(block.txtTrans) ? block.txtTrans : []
    const orig = Array.isArray(block.txtOrg) ? block.txtOrg : []

    return (
        <div className="block block--translation-list">
            <ol className="translation-list-items">
                {trans.map((item, i) => (
                    <li key={i}>
                        <InlineText text={item} onFootnoteClick={onFootnoteClick} onFootnoteHover={onFootnoteHover} highlight={highlight} />
                    </li>
                ))}
            </ol>

            {orig.length > 0 && (
                <div className="translation-original">
                    <button
                        className="toggle-original"
                        onClick={() => setShowOriginal((v) => !v)}
                    >
                        {showOriginal ? (lang === 'heb' ? '▲ הסתר מקור' : '▲ Hide original') : lang === 'heb' ? '▼ הצג מקור' : '▼ Show original'}
                    </button>
                    {showOriginal && (
                        <ol className="original-list-items">
                            {orig.map((item, i) => (
                                <li key={i}>
                                    <InlineText text={item} onFootnoteClick={onFootnoteClick} onFootnoteHover={onFootnoteHover} highlight={highlight} />
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            )}
        </div>
    )
}
