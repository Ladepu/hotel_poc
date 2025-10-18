import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { bookHotel } from '../services'

export default function BookingForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const hotel = location.state?.hotel

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!hotel) {
    return (
      <div className="p-6 text-center">
        <p>No hotel selected. Go back and choose one.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate('/')}
        >
          Back to Search
        </button>
      </div>
    )
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        user_id: 'anonymous',
        hotel_id: hotel.id,
        destination: hotel.destination,
        check_in: new Date().toISOString().slice(0, 10),
        check_out: new Date().toISOString().slice(0, 10),
        num_guests: 1,
        total_price: hotel.price,
        ...form
      }
      const res = await bookHotel(payload)
      navigate('/confirmation', { state: { hotel, booking_id: res.booking_id, form } })
    } catch (err) {
      setError('Booking failed. Please try again.')
    }
    setLoading(false)
  }
   async function onBook(h){
      const payload={user_id:'anonymous', hotel_id:h.id, destination:h.destination, check_in:new Date().toISOString().slice(0,10), check_out:new Date().toISOString().slice(0,10), num_guests:1, total_price:h.price}
      const res=await bookHotel(payload)
      setMsg('Booking confirmed: '+res.booking_id)
    }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Enter Your Details</h1>
      <div className="mb-3 p-3 bg-gray-100 rounded">
        <p><b>Hotel:</b> {hotel.name}</p>
        <p><b>Destination:</b> {hotel.destination}</p>
        <p><b>Price:</b> ${hotel.price}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="first_name" placeholder="First Name" className="w-full p-2 border rounded" value={form.first_name} onChange={handleChange} required />
        <input name="last_name" placeholder="Last Name" className="w-full p-2 border rounded" value={form.last_name} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" className="w-full p-2 border rounded" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" className="w-full p-2 border rounded" value={form.phone} onChange={handleChange} required />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded"
        >
          {loading? <div>Loading...</div> : <ResultsGrid hotels={results} onBook={onBook} />}
             {msg && <div className='mt-4 p-3 bg-green-100 rounded'>{msg}</div>}
        </button>
      </form>

      {error && <p className="mt-3 text-red-600">{error}</p>}
    </div>
  )
}
