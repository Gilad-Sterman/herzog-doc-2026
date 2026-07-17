import { useState } from 'react'
import InlineText from '../InlineText'

export default function TripleTranslationBlock({ block, onFootnoteClick }) {
    const [showOriginal, setShowOriginal] = useState(false)

    return (
        <div className="block block--triple-translation">
            {block.txtTrans && (
                <blockquote className="translation-text">
                    <InlineText text={block.txtTrans} onFootnoteClick={onFootnoteClick} />
                </blockquote>
            )}

            {(block.txtOrg || block.txtOrgLang) && (
                <div className="translation-original">
                    <button
                        className="toggle-original"
                        onClick={() => setShowOriginal((v) => !v)}
                    >
                        {showOriginal ? '▲ Hide original' : '▼ Show original'}
                    </button>
                    {showOriginal && (
                        <div className="triple-originals">
                            {block.txtOrgLang && (
                                <p className="original-lang-text">{block.txtOrgLang}</p>
                            )}
                            {block.txtOrg && (
                                <blockquote className="original-text">
                                    <InlineText text={block.txtOrg} onFootnoteClick={onFootnoteClick} />
                                </blockquote>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
