import React, { useEffect, useState } from 'react'
import sendBooking from '../components/BookingForm'
import IBooking from '../interfaces/IBooking'

function CreateBooking() {
    let defaultValue: IBooking = {
        phonenumber: '',
        lastname: 'String',
        firstname: '',
        email: 'String',
        guests: 0,
        booking_reference: '',
        message: '',
        date: '',
        time: '',
    }

    const [newBooking, setBooking] = useState(defaultValue);

    useEffect(() => {

        const sendBooking = () => {

            console.log('hello')
        }

        sendBooking()
    }, [])

    return (
        <div>

        </div>
    )
}

export default CreateBooking
