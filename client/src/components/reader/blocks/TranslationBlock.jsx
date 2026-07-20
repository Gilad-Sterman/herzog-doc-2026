import { useState } from 'react'
import InlineText from '../InlineText'

export default function TranslationBlock({ block, onFootnoteClick, lang }) {
    const [showOriginal, setShowOriginal] = useState(false)

    return (
        <div className="block block--translation">
            {block.txtTrans && (
                <blockquote className="translation-text">
                    <InlineText text={block.txtTrans} onFootnoteClick={onFootnoteClick} />
                </blockquote>
            )}

            {block.txtOrg && (
                <div className="translation-original">
                    <button
                        className="toggle-original"
                        onClick={() => setShowOriginal((v) => !v)}
                    >
                        {showOriginal ? (lang === 'heb' ? '▲ הסתר מקור' : '▲ Hide original') : lang === 'heb' ? '▼ הצג מקור' : '▼ Show original'}
                    </button>
                    {showOriginal && (
                        <blockquote className="original-text">
                            <InlineText text={block.txtOrg} onFootnoteClick={onFootnoteClick} />
                        </blockquote>
                    )}
                </div>
            )}

            {!block.txtTrans && block.txtOrg && (
                <blockquote className="original-text original-text--only">
                    <InlineText text={block.txtOrg} onFootnoteClick={onFootnoteClick} />
                </blockquote>
            )}
        </div>
    )
}
