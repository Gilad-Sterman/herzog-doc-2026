import axios from 'axios'

const BASE = '/api/search'

export const searchService = {
    async search(txt, lang = 'en') {
        const { data } = await axios.get(BASE, { params: { txt, lang } })
        return data
    },
}
