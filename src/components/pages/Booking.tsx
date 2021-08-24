import React from 'react'
import BookingForm from '../BookingForm'
import Header from '../Header'
import './../../styles/Booking.scss'

function Booking() {
    return (
        <div className="book-wrap">
            <Header title="Boka"></Header>
            <BookingForm></BookingForm>
        </div>
    )
}

export default Booking
