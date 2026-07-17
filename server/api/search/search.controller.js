import { searchService } from "./search.service.js"
import { logger } from '../../services/logger.service.js'

export async function getSearchRes(req, res) {
    const { txt, lang } = req.query
    // res.send(text)
    // return
    try {
        const searchRes = lang === 'heb' ? await searchService.queryHeb(txt) : await searchService.query(txt)
        res.send(searchRes)
    } catch (err) {
        logger.error('Failed to get results', err)
        res.status(500).send({ err: 'Failed to get results' })
    }
}