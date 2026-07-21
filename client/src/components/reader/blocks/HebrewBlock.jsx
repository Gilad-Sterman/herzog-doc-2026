import InlineText from '../InlineText'

export default function HebrewBlock({ block, onFootnoteClick, onFootnoteHover, highlight }) {
    return (
        <blockquote className="block block--hebrew">
            <InlineText text={block.txt} onFootnoteClick={onFootnoteClick} onFootnoteHover={onFootnoteHover} highlight={highlight} />
        </blockquote>
    )
}
