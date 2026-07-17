import express from 'express'
import { getChapter, getChapterHeb, getChapters, getChaptersHeb } from './chapter.controller.js'

export const chapterRoutes = express.Router()

chapterRoutes.get('/heb', getChaptersHeb)
chapterRoutes.get('/heb/:num', getChapterHeb)
chapterRoutes.get('/:num', getChapter)
chapterRoutes.get('/', getChapters)
