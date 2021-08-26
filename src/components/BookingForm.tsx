import React, { createRef, useState } from 'react'
import './../styles/Booking.scss'
import gavidare from './../images/gå vidare med bokning knapp.svg'
import IBooking from '../interfaces/IBooking'
import axios from 'axios';
import GuestComponent from './GuestForm'



function BookingForm() {

    const [time, setTime] = useState('18:00');
    const [toggleTimeBtns, setToggleTimeBtns] = useState(true);
    const [showFirst, setShowFirst] = useState(true);
    const [bookingList, setBookingList] = useState<IBooking[]>();
    const [firstPart, setFirstPart] = useState({
        guests: 1,
        time: '',
        date: ''
    })

    const [requestedBooking, setRequestedBooking] = useState({
        guests: 1,
        date: ''
    });
    const [guests, setGuests] = useState({
        guestsForRequestedDate: 0, guestsTOne: 0, guestsTTwo: 0
    })

    const guestsRef = createRef<HTMLSelectElement>();
    const dateRef = createRef<HTMLInputElement>();

    function sendFirstPart() {
        setFirstPart({
            guests: Number(guestsRef.current?.value),
            date: (dateRef.current?.value)?.toString() || '2021-09-29',
            time: time
        })
        setShowFirst(false)
    }


    //store requested date and number of guests in variables 
    function sendRequest() {
        setRequestedBooking({
            guests: Number(guestsRef.current?.value) || 1,
            date: (dateRef.current?.value)?.toString() || Date.now().toString(),
        })
        console.log(requestedBooking);
        console.log("Number of guests: ", requestedBooking?.guests, "Date requested: ", requestedBooking?.date);


        //get the bookings from the database 
        axios.get('http://localhost:4000/bookings')
            .then((res) => {
                setBookingList(res.data)
                const totalNumberOfGuestsList = bookingList?.filter(totalGuests => (totalGuests.date === requestedBooking?.date)).map(filteredGuests => (filteredGuests.guests));
                const totalNumberOfGuestsForRequestedDate = totalNumberOfGuestsList?.reduce((a, b) => a + b, 0);
                setGuests({ guestsForRequestedDate: totalNumberOfGuestsForRequestedDate || 0, guestsTOne: 0, guestsTTwo: 0 })
                console.log("total number of guests that have already booked: ", totalNumberOfGuestsForRequestedDate);


                const timeSlotOne = bookingList?.filter(bookingList=> bookingList.includes('18.00'));
                console.log(timeSlotOne);
            }).catch((error) => {
                console.log(error)
            });
    }

    //Get the time slots from the database
    function timeSlots() {

    }

    return (
        <>
            {showFirst &&
                <div className="white-container-booking" >

                    <label htmlFor="guests">Antal Gäster</label>
                    <select name="guests" id="guests" ref={guestsRef} required>
                        <option value={1} >1</option>
                        <option value={2} >2</option>
                        <option value={3} >3</option>
                        <option value={4} >4</option>
                        <option value={5} >5</option>
                        <option value={6} >6</option>
                        <option value={7} >7</option>
                        <option value={8} >8</option>
                        <option value={9} >9</option>
                        <option value={10} >10</option>
                        <option value={11} >11</option>
                        <option value={12} >12</option>
                    </select>
                    <div className="date-time-wrap">
                        <div>
                            <label htmlFor="date">Datum</label>
                            <input ref={dateRef} type="date" name="date" id="date" required onChange={sendRequest} />
                            {guests.guestsForRequestedDate + requestedBooking.guests > 180 || guests.guestsTOne + requestedBooking.guests > 90 || guests.guestsTTwo + requestedBooking.guests > 90 ? <p>Sorry, we are fully booked today</p> : <p>Pick an available time slot</p>}

                        </div>
                        <div>
                            <label htmlFor="tid">Tid</label>
                            {toggleTimeBtns &&
                                <div className="time-btns">

                                    <button className="time-btn-clicked" >18:00</button>
                                    <button className="time-btn" onClick={() => { setToggleTimeBtns(false); setTime('21:00') }} >21:00</button>
                                </div>
                            }
                            {!toggleTimeBtns &&
                                <div className="time-btns">
                                    <button className="time-btn" onClick={() => { setToggleTimeBtns(true); setTime('18:00') }} > 18:00</button>
                                    <button className="time-btn-clicked"  >21:00</button>
                                </div>
                            }

                        </div>
                    </div>
                    <button className="confirm-btn" onClick={(e) => { e.preventDefault(); sendFirstPart(); }}>
                        <img src={gavidare} alt="" />
                    </button>
                </div>}
            
        {!showFirst && 
         <div className="white-container-booking">
             <div className="booking-info-container">
                 <p>Antal: <br></br> {firstPart.guests}</p>
                 <p>Datum: <br></br> {firstPart.date}</p>
                 <p>Tid: <br></br> {firstPart.time}</p>

             </div>
             <GuestComponent time={firstPart.time} date={firstPart.date} guests={firstPart.guests}></GuestComponent>
         </div>
     
        }
        </>        

    )
}


export default BookingForm

