import React, {useState} from 'react'
import { aiQuery } from '../services'
export default function AIInput({onSearch}){
  const [text,setText]=useState('')
  const [loading,setLoading]=useState(false)
  async function ask(){setLoading(true); try{const parsed=await aiQuery(text); onSearch(parsed)}catch(e){alert('AI parse failed')} setLoading(false)}
  return (<div className='mb-4'>
    <textarea value={text} onChange={e=>setText(e.target.value)} placeholder='e.g. "Book a 3-star hotel in Miami for 2 adults from 2025-11-10 to 2025-11-15"' className='w-full border rounded p-2' rows={3} />
    <div className='flex gap-2 mt-2'><button onClick={ask} className='px-4 py-2 bg-purple-600 text-white rounded'>Ask AI</button>{loading && <div>Parsing...</div>}</div>
  </div>)
}
