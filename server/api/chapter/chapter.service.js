import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import axios from 'axios'
import mongodb from 'mongodb'

export const chapterService = {
    query,
    queryHeb,
    getByNum,
    getByNumHeb,
    remove,
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('herzog_chapters')
        var chapters = await collection.find(criteria).toArray()
        return chapters
    } catch (err) {
        logger.error('cannot find chapters', err)
        throw err
    }
}

async function queryHeb(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('herzog_chapters_heb')
        var chapters = await collection.find(criteria).toArray()
        return chapters
    } catch (err) {
        logger.error('cannot find Hebrew chapters', err)
        throw err
    }
}

async function getByNum(num) {
    try {
        const collection = await dbService.getCollection('herzog_chapters')
        const chapter = await collection.findOne({ num })
        return chapter
    } catch (err) {
        logger.error(`while finding chapter ${num}`, err)
        throw err
    }
}

async function getByNumHeb(num) {
    try {
        const collection = await dbService.getCollection('herzog_chapters_heb')
        const chapter = await collection.findOne({ num })
        return chapter
    } catch (err) {
        logger.error(`while finding Hebrew chapter ${num}`, err)
        throw err
    }
}

async function remove(chapterId) {
    try {
        const collection = await dbService.getCollection('herzog_chapters')
        await collection.deleteOne({ _id: ObjectId(chapterId) })
    } catch (err) {
        logger.error(`cannot remove chapter ${chapterId}`, err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                title: txtCriteria
            },
            {
                name: txtCriteria
            }
        ]
    }
    return criteria
}
