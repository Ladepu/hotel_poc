import axios from 'axios'
const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'
export const searchHotels = (payload) => axios.post(`${BACKEND}/api/search_hotels`, payload).then(r=>r.data)
export const bookHotel = (payload) => axios.post(`${BACKEND}/api/book`, payload).then(r=>r.data)
export const aiQuery = (text) => axios.post(`${BACKEND}/api/ai_query`, {text}).then(r=>r.data)
