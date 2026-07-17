import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

export const searchService = {
    query,
    queryHeb,
}

async function query(text) {
    const criteria = buildCritiria(text)
    try {
        const collection = await dbService.getCollection('herzog_chapters')
        var searcRes = await collection.find(criteria).limit(10).toArray()
        return searcRes
    } catch (err) {
        logger.error('cannot find results', err)
        throw err
    }
}

async function queryHeb(text) {
    const criteria = buildCritiria(text)
    try {
        const collection = await dbService.getCollection('herzog_chapters_heb')
        var searcRes = await collection.find(criteria).limit(10).toArray()
        return searcRes
    } catch (err) {
        logger.error('cannot find results', err)
        throw err
    }
}

function buildCritiria(text) {
    const rx = { $regex: text, $options: 'i' }
    return {
        $or: [
            { title: rx },
            { 'subChapters.title': rx },
            { 'subChapters.txt.txt': rx },
            { 'subChapters.txt.txtTrans': rx },
            { 'subChapters.txt.txtOrg': rx },
            { 'subChapters.footNotes': rx },
            { 'text.txt': rx },
            { 'text.txtTrans': rx },
            { 'text.txtOrg': rx },
            { 'footNotes': rx },
        ]
    }
}