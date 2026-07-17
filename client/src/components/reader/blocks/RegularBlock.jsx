import InlineText from '../InlineText'

export default function RegularBlock({ block, onFootnoteClick }) {
    return (
        <p className="block block--regular">
            <InlineText text={block.txt} onFootnoteClick={onFootnoteClick} />
        </p>
    )
}
