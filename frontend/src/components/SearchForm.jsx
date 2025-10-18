import React, {useState} from 'react'
export default function SearchForm({onSearch}){
  const [destination,setDestination]=useState('')
  const [checkIn,setCheckIn]=useState('')
  const [checkOut,setCheckOut]=useState('')
  const [guests,setGuests]=useState(1)
  function submit(e){e.preventDefault(); onSearch({destination, check_in: checkIn, check_out: checkOut, num_guests: guests})}
  return (<form className='grid grid-cols-1 md:grid-cols-4 gap-3 my-4' onSubmit={submit}>
    <input value={destination} onChange={e=>setDestination(e.target.value)} placeholder='Destination' className='p-2 border rounded' />
    <input type='date' value={checkIn} onChange={e=>setCheckIn(e.target.value)} className='p-2 border rounded' />
    <input type='date' value={checkOut} onChange={e=>setCheckOut(e.target.value)} className='p-2 border rounded' />
    <div className='flex gap-2'><input type='number' min={1} value={guests} onChange={e=>setGuests(Number(e.target.value))} className='p-2 border rounded w-24' />
    <button className='px-4 py-2 bg-blue-600 text-white rounded'>Search</button></div>
  </form>)
}
