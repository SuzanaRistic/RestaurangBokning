import React, { createRef, useRef, useState } from 'react'
import './../styles/Booking.scss'
import button from './../images/bekfräftaknapp.svg'
import IBooking from '../interfaces/IBooking'


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

    return (
        <>
        { showFirst &&  
        <div className="white-back" >

            <label htmlFor="guests">Antal Gäster</label>
            <select name="guests" id="guests" ref={guestsRef} >
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
                    <input ref={dateRef} type="date" name="date" id="date" />
                </div>
                <div>
                    <label htmlFor="tid">Tid</label>
                    
                    <button >18:00</button>
                    <button >21:00</button>
                </div>
            </div>
            <button className="confirm-btn" onClick={(e)=>{e.preventDefault(); setShowFirst(false) }}>
                <img src={button} alt="" />
            </button> 
        </div> }
        {!showFirst && 
         <div className="white-back">
         <label htmlFor="firstname">Förnamn</label>
                 <input type="text" name="firstname" ref={firstNameRef}/>
 
                 <label htmlFor="lastname">Efternamn</label>
                 <input type="text" name="lastname" ref={lastNameRef}/>
 
                 <label htmlFor="email">Email</label>
                 <input type="email" name="email" ref={emailRef}/>
 
                 <label htmlFor="telefon">Telefon</label>
                 <input type="tel" name="telefon" ref={phoneRef}/>
 
                 <label htmlFor="message">Allergener/Önskemål</label>
                 <textarea rows={4} name="message" ref={messageRef}/>

                <button className="confirm-btn" onClick={(e)=>{e.preventDefault();}}>
                <img src={button} alt="" />
                </button> 
         </div>
     
        }
        </>
                
    )
}

export default BookingForm
