import InlineText from '../InlineText'

export default function HebrewBlock({ block, onFootnoteClick }) {
    return (
        <blockquote className="block block--hebrew">
            <InlineText text={block.txt} onFootnoteClick={onFootnoteClick} />
        </blockquote>
    )
}
