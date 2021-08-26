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
                const totalNumberOfGuestsAndTimeList = bookingList?.filter(totalGuests => (totalGuests.date === requestedBooking?.date)).map(filteredGuests => ({ time: filteredGuests.time, guests: filteredGuests.guests }));
                console.log(totalNumberOfGuestsAndTimeList);

                const totalNumberOfGuestsList = totalNumberOfGuestsAndTimeList?.map(filterGuests => (filterGuests.guests));
                console.log(totalNumberOfGuestsList);


                const totalNumberOfGuestsForRequestedDate = totalNumberOfGuestsList?.reduce((a, b) => a + b, 0);



                const guestsForTimeSlotOne = totalNumberOfGuestsAndTimeList?.filter(totalNumberOfGuestsAndTimeListFiltered => totalNumberOfGuestsAndTimeListFiltered.time === ('18:00')).map(filterSlotOne => (filterSlotOne.guests)).reduce((a, b) => a + b, 0);
                const guestsForTimeSlotTwo = totalNumberOfGuestsAndTimeList?.filter(totalNumberOfGuestsAndTimeListFiltered => totalNumberOfGuestsAndTimeListFiltered.time === ('21:00')).map(filterSlotTwo => (filterSlotTwo.guests)).reduce((a, b) => a + b, 0);
                console.log("T1: ", guestsForTimeSlotOne, "T2: ", guestsForTimeSlotTwo);

                setGuests({ guestsForRequestedDate: totalNumberOfGuestsForRequestedDate || 0, guestsTOne: guestsForTimeSlotOne || 0, guestsTTwo: guestsForTimeSlotTwo || 0 })
                console.log("total number of guests that have already booked: ", totalNumberOfGuestsForRequestedDate, "guestsT1: ", guestsForTimeSlotOne, "guestsT2: ", guestsForTimeSlotTwo);

            }).catch((error) => {
                console.log(error)
            });
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
                        </div>
                        <div>
                            <label htmlFor="tid">Tid</label>
                            {guests.guestsForRequestedDate + requestedBooking.guests > 5 ?
                                <>
                                    <div className="time-btns">
                                        <button className="time-btn-disabled" disabled>18:00</button>
                                        <button className="time-btn-disabled" disabled>21:00</button>
                                    </div>
                                    <p>Sorry, we are fully booked today</p>
                                </>

                                : guests.guestsTOne + requestedBooking.guests > 90
                                    ?
                                    <>
                                        <div className="time-btns">
                                            <button className="time-btn-disabled" disabled>18:00</button>
                                            <button className="time-btn-clicked" onClick={() => { setTime('21:00') }} >21:00</button>
                                        </div>
                                        <p>Only 21:00 is available on this night</p>
                                    </>
                                    : guests.guestsTTwo + requestedBooking.guests > 90 ?
                                        <>
                                            <div className="time-btns">
                                                <button className="time-btn-clicked" onClick={() => { setTime('18:00') }} > 18:00</button>
                                                <button className="time-btn-disabled" disabled >21:00</button>
                                            </div>
                                            <p>Only 18:00 is available on this night</p>
                                        </>
                                        :
                                        toggleTimeBtns ?
                                            <>
                                                <div className="time-btns">
                                                    <button className="time-btn-clicked" >18:00</button>
                                                    <button className="time-btn" onClick={() => { setToggleTimeBtns(false); setTime('21:00') }} >21:00</button>
                                                </div>
                                                <p>Pick an available time slot</p>
                                            </>
                                            :
                                            <>
                                                <div className="time-btns">
                                                    <button className="time-btn" onClick={() => { setToggleTimeBtns(true); setTime('18:00') }} > 18:00</button>
                                                    <button className="time-btn-clicked"  >21:00</button>
                                                </div>
                                                <p>Pick an available time slot</p>
                                            </>

                            }




                        </div>
                    </div>
                    <button className="confirm-btn" onClick={(e) => { e.preventDefault(); sendFirstPart(); }}>
                        <img src={gavidare} alt="" />
                    </button>
                </div >}

            {
                !showFirst &&
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

