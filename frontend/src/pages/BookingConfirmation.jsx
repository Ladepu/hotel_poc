import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function BookingConfirmation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { hotel, booking_id, form } = location.state || {}

  if (!hotel) {
    return (
      <div className="p-6 text-center">
        <p>No booking data found.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate('/')}
        >
          Back to Search
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-700">
        Booking Confirmed 🎉
      </h1>
      <p><b>Booking ID:</b> {booking_id}</p>
      <p><b>Name:</b> {form.first_name} {form.last_name}</p>
      <p><b>Email:</b> {form.email}</p>
      <p><b>Phone:</b> {form.phone}</p>
      <div className="mt-4 p-3 bg-gray-100 rounded">
        <p><b>Hotel:</b> {hotel.name}</p>
        <p><b>Destination:</b> {hotel.destination}</p>
        <p><b>Price:</b> ${hotel.price}</p>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  )
}
