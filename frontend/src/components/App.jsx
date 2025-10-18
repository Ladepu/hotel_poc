import React, {useState} from 'react'
import AIInput from './components/AIInput'
import SearchForm from './components/SearchForm'
import ResultsGrid from './components/ResultsGrid'
import { searchHotels, bookHotel } from './services'
export default function App(){
  const [results,setResults]=useState([])
  const [msg,setMsg]=useState('')
  const [loading,setLoading]=useState(false)
  async function onSearch(payload){
    setLoading(true)
    try{const res=await searchHotels(payload); setResults(res)}catch(e){setMsg('Search failed')}
    setLoading(false)
  }
  async function onBook(h){
    const payload={user_id:'anonymous', hotel_id:h.id, destination:h.destination, check_in:new Date().toISOString().slice(0,10), check_out:new Date().toISOString().slice(0,10), num_guests:1, total_price:h.price}
    const res=await bookHotel(payload)
    setMsg('Booking confirmed: '+res.booking_id)
  }
  return (<div className='p-6 max-w-5xl mx-auto'>
    <h1 className='text-3xl font-bold mb-4'>Hotel Booking</h1>
    <AIInput onSearch={onSearch} />
    <SearchForm onSearch={onSearch} />
    {loading? <div>Loading...</div> : <ResultsGrid hotels={results} onBook={onBook} />}
    {msg && <div className='mt-4 p-3 bg-green-100 rounded'>{msg}</div>}
  </div>)
}
