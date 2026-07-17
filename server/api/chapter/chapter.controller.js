import { chapterService } from "./chapter.service.js"
import { logger } from "../../services/logger.service.js"

export async function getChapter(req, res) {
    try {
        const chapter = await chapterService.getByNum(req.params.num)
        res.send(chapter)
    } catch (err) {
        logger.error('Failed to get chapter', err)
        res.status(500).send({ err: 'Failed to get chapter' })
    }
}

export async function getChapters(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
        }
        const chapters = await chapterService.query(filterBy)
        res.send({ chapters })
    } catch (err) {
        logger.error('Failed to get chapters', err)
        res.status(500).send({ err: 'Failed to get chapters' })
    }
}

export async function getChaptersHeb(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
        }        
        const chapters = await chapterService.queryHeb(filterBy)
        res.send({ chapters })
    } catch (err) {
        logger.error('Failed to get Hebrew chapters', err)
        res.status(500).send({ err: 'Failed to get chapters' })
    }
}

export async function getChapterHeb(req, res) {
    try {
        const chapter = await chapterService.getByNumHeb(req.params.num)
        res.send(chapter)
    } catch (err) {
        logger.error('Failed to get Hebrew chapter', err)
        res.status(500).send({ err: 'Failed to get chapter' })
    }
}