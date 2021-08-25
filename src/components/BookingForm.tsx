import React, { createRef, useEffect, useState } from 'react'
import './../styles/Booking.scss'
import button from './../images/bekfräftaknapp.svg'
import IBooking from '../interfaces/IBooking'
import axios from 'axios';


function BookingForm() {
    const [showFirst, setShowFirst] = useState(true);
    const [booking, setBooking] = useState<IBooking>()
    const guestsRef = createRef<HTMLSelectElement>();
    const dateRef = createRef<HTMLInputElement>();
    const firstNameRef = createRef<HTMLInputElement>();
    const lastNameRef = createRef<HTMLInputElement>();
    const phoneRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const messageRef = createRef<HTMLTextAreaElement>();

    function sendBooking() {

        setBooking({
            firstname: firstNameRef.current?.value || ' ',
            lastname: lastNameRef.current?.value || ' ',
            email: firstNameRef.current?.value || ' ',
            phonenumber: firstNameRef.current?.value || ' ',
            time: firstNameRef.current?.value || ' ',
            booking_reference: ' blabla',
            guests: Number(guestsRef.current?.value) || 1,
            date: (dateRef.current?.value)?.toString() || Date.now().toString(),
            message: messageRef.current?.value || ' '
        })
    }



    function sendTime() {
        setBooking({
            firstname: ' ',
            lastname: ' ',
            email: ' ',
            phonenumber: ' ',
            time: ' ',
            booking_reference: ' blabla',
            guests: Number(guestsRef.current?.value) || 1,
            date: (dateRef.current?.value)?.toString() || Date.now().toString(),
            message: messageRef.current?.value || ' '
        })

        const numberOfGuests = booking?.guests;
        const bookedDate = booking?.date

        console.log(numberOfGuests);
        console.log(bookedDate);



        axios.get('http://localhost:4000/bookings')
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });



    }



    return (
        <>
            {showFirst &&
                <div className="white-container" >

                    <label htmlFor="guests">Antal Gäster</label>
                    <select name="guests" id="guests" ref={guestsRef} required>
                        <option value='1' >1</option>
                        <option value='2' >2</option>
                        <option value='3' >3</option>
                        <option value='4' >4</option>
                        <option value='5' >5</option>
                        <option value='6' >6</option>
                        <option value='7' >7</option>
                        <option value='8' >8</option>
                        <option value='9' >9</option>
                        <option value='10' >10</option>
                        <option value='11' >11</option>
                        <option value='12' >12</option>
                    </select>
                    <div className="date-time-wrap">
                        <div>
                            <label htmlFor="date">Datum</label>
                            <input ref={dateRef} type="date" name="date" id="date" required />
                        </div>
                        <div>
                            <label htmlFor="tid">Tid</label>

                            <button >18:00</button>
                            <button >21:00</button>
                        </div>
                    </div>
                    <button className="confirm-btn" onClick={sendTime}>
                        {/* {() => { sendTime(); setShowFirst(false) }} */}
                        <img src={button} alt="" />
                    </button>
                </div>}
            {!showFirst &&
                <div className="white-container">
                    <label htmlFor="firstname">Förnamn</label>
                    <input type="text" name="firstname" ref={firstNameRef} required />

                    <label htmlFor="lastname">Efternamn</label>
                    <input type="text" name="lastname" ref={lastNameRef} required />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" ref={emailRef} required />

                    <label htmlFor="telefon">Telefon</label>
                    <input type="tel" name="telefon" ref={phoneRef} required />

                    <label htmlFor="message">Allergener/Önskemål</label>
                    <textarea rows={4} name="message" ref={messageRef} required />

                    <button className="confirm-btn" onClick={sendBooking}>
                        <img src={button} alt="" />
                    </button>
                </div>

            }
        </>

    )
}

export default BookingForm

