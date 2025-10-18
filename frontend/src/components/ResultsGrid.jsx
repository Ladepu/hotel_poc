import React from 'react'
export default function ResultsGrid({hotels, onBook}){
  if(!hotels || hotels.length===0) return <div>No hotels found</div>
  return (<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
    {hotels.map(h=> (<div key={h.id} className='border rounded p-3'>
      <img src={h.image_url||'https://via.placeholder.com/300'} alt='hotel' className='w-full h-40 object-cover rounded' />
      <h3 className='text-lg font-semibold mt-2'>{h.name}</h3>
      <div className='text-sm'>Rating: {h.rating||'—'}</div>
      <div className='text-xl font-bold'>${h.price||'—'}/night</div>
      <button onClick={()=>onBook(h)} className='mt-2 w-full px-3 py-2 bg-green-600 text-white rounded'>Book Now</button>
    </div>))}
  </div>)
}
