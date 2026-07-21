import InlineText from '../InlineText'

export default function RegularBlock({ block, onFootnoteClick, onFootnoteHover, highlight }) {
    return (
        <p className="block block--regular">
            <InlineText text={block.txt} onFootnoteClick={onFootnoteClick} onFootnoteHover={onFootnoteHover} highlight={highlight} />
        </p>
    )
}
