import InlineText from '../InlineText'

export default function ListBlock({ block, onFootnoteClick, onFootnoteHover, highlight }) {
    const items = Array.isArray(block.txt) ? block.txt : []
    return (
        <ol className="block block--list">
            {items.map((item, i) => (
                <li key={i}>
                    <InlineText text={item} onFootnoteClick={onFootnoteClick} onFootnoteHover={onFootnoteHover} highlight={highlight} />
                </li>
            ))}
        </ol>
    )
}
