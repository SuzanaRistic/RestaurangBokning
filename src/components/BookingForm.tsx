import React, { createRef, useEffect, useState } from 'react'
import './../styles/Booking.scss'
import gavidare from './../images/gå vidare med bokning knapp.svg'
import button from './../images/bekfräftaknapp.svg'
import IBooking from '../interfaces/IBooking'
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import GuestComponent from './GuestForm'



function BookingForm() {
    let history = useHistory();

    const [time, setTime] = useState('18:00');
    const [toggleTimeBtns, setToggleTimeBtns] = useState(true);
    const [showFirst, setShowFirst] = useState(true);
    const [booking, setBooking] = useState<IBooking>();
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
    const firstNameRef = createRef<HTMLInputElement>();
    const lastNameRef = createRef<HTMLInputElement>();
    const phoneRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const messageRef = createRef<HTMLTextAreaElement>();
    



     const booking_ref = uuidv4();
   
    function sendFirstPart () {
        setFirstPart({
            guests: Number(guestsRef.current?.value),
            date:  (dateRef.current?.value)?.toString() || '2021-09-29',
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
                setGuests({ guestsForRequestedDate: Number(totalNumberOfGuestsForRequestedDate), guestsTOne: 0, guestsTTwo: 0 })
                console.log("total number of guests that have already booked: ", totalNumberOfGuestsForRequestedDate);
            }).catch((error) => {
                console.log(error)
            });
    }
   

    return (
        <>
        { showFirst &&  
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
                    <input ref={dateRef} type="date" name="date" id="date" required/>
                    {requestedBooking.guests > 90}{<h2>Sorry, we are fully booked today</h2>}

                </div>
                <div>
                    <label htmlFor="tid">Tid</label>
                    {toggleTimeBtns && 
                    <div className="time-btns">
                    
                    <button className="time-btn-clicked" >18:00</button>
                    <button className="time-btn" onClick={()=>{setToggleTimeBtns(false); setTime('21:00')}} >21:00</button>
                    </div>
                    }
                    {!toggleTimeBtns && 
                    <div className="time-btns">
                    <button className="time-btn" onClick={()=>{setToggleTimeBtns(true); setTime('18:00')}} > 18:00</button>
                    <button  className="time-btn-clicked"  >21:00</button>
                    </div>
                    }
                    
                </div>
            </div>
            <button className="confirm-btn" onClick={(e)=>{e.preventDefault(); sendFirstPart(); sendTime(); }}>
                <img src={gavidare} alt="" />
            </button> 
        </div> }
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

