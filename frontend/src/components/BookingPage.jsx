import React from "react";
import { useLocation } from "react-router-dom";

export default function BookingPage() {
  const location = useLocation();
  const hotel = location.state?.hotel;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmation</h1>
      {hotel ? (
        <div className="p-4 bg-gray-100 rounded">
          <p><b>Hotel:</b> {hotel.name}</p>
          <p><b>Destination:</b> {hotel.destination}</p>
          <p><b>Price:</b> ${hotel.price}</p>
          <p><b>Booking Date:</b> {new Date().toLocaleDateString()}</p>
        </div>
      ) : (
        <p>No hotel selected.</p>
      )}
    </div>
  );
}
