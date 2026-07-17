import axios from 'axios'

const BASE = '/api/chapter'

export const chapterService = {
    async getChapters(lang = 'en') {
        const url = lang === 'heb' ? `${BASE}/heb` : BASE
        const { data } = await axios.get(url)
        return data.chapters
    },

    async getChapter(num, lang = 'en') {
        const url = lang === 'heb' ? `${BASE}/heb/${num}` : `${BASE}/${num}`
        const { data } = await axios.get(url)
        return data
    },
}
