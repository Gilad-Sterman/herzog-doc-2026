import express from 'express'
import { getSearchRes } from './search.controller.js'

export const searchRoutes = express.Router()

searchRoutes.get('/', getSearchRes)