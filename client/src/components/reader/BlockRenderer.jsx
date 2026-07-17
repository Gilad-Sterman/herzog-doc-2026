import RegularBlock from './blocks/RegularBlock'
import TranslationBlock from './blocks/TranslationBlock'
import TripleTranslationBlock from './blocks/TripleTranslationBlock'
import HebrewBlock from './blocks/HebrewBlock'
import TitleBlock from './blocks/TitleBlock'
import ImgBlock from './blocks/ImgBlock'
import ListBlock from './blocks/ListBlock'
import TranslationListBlock from './blocks/TranslationListBlock'

const BLOCK_MAP = {
    regular: RegularBlock,
    translation: TranslationBlock,
    tripleTranslation: TripleTranslationBlock,
    hebrew: HebrewBlock,
    title: TitleBlock,
    img: ImgBlock,
    list: ListBlock,
    translationList: TranslationListBlock,
}

export default function BlockRenderer({ block, onFootnoteClick }) {
    const Component = BLOCK_MAP[block.type]
    if (!Component) {
        console.warn('Unknown block type:', block.type)
        return null
    }
    return <Component block={block} onFootnoteClick={onFootnoteClick} />
}
