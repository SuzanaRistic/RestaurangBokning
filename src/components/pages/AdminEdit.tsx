import axios from 'axios';
import React, { createRef, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import IBooking from '../../interfaces/IBooking';
import Header from '../Header'
import './../../styles/EditAdmin.scss'
import {IParams} from './Confirmation'
import knapp from "./../../images/ändrabokningknapp.svg";
import { findTables } from '../findTime';

//Function for admin to edit bookings
function AdminEdit() {
    const history = useHistory();
    const { ref } = useParams<IParams>();
    const [booking, setBooking] = useState<IBooking>()
    const [bookingList, setBookingList] = useState<IBooking[]>();
    const [timeOptions, setTimeOptions] = useState(<div></div>);
    const [warning, setWarning] = useState(<p></p>);
    useEffect(() => {
        axios.get(`http://localhost:4000/bookings/${ref}`)
        .then(function (response) {
            setBooking(response.data)
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])
    const firstNameRef = createRef<HTMLInputElement>();
    const lastNameRef = createRef<HTMLInputElement>();
    const phoneRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const messageRef = createRef<HTMLTextAreaElement>();
    const dateRef = createRef<HTMLInputElement>();
    const guestRef = createRef<HTMLInputElement>();
    const timeRef = createRef<HTMLSelectElement>();

// Function that allows admin to search for available date/time
    function findAvailable () {
        const tables = findTables(bookingList || [], dateRef.current?.value || ' ');
        const guests = Number(guestRef.current?.value) || 0
        if (tables.tablesForSlotOne + tables.tablesForSlotTwo + Math.ceil(guests / 6) >= 30) {
            setTimeOptions(
                <>
                    <option disabled={true} value="18:00">18:00</option>
                    <option disabled={true}  value="21:00">21:00</option>
                </>
            )
            setWarning(<p  className="time-warning">Hela dagen fullbokad</p> )
        }
        else if (tables.tablesForSlotOne + Math.ceil(guests / 6) > 15) {
            setTimeOptions(
                <>
                    <option disabled={true} value="18:00">18:00</option>
                    <option disabled={false}  value="21:00">21:00</option>
                </>
            )
            setWarning(<p className="time-warning">18:00 fullbokad</p>)
        } else if (tables.tablesForSlotTwo + Math.ceil(guests / 6) > 15) {
            setTimeOptions(
                <>
                    <option disabled={false} value="18:00">18:00</option>
                    <option disabled={true}  value="21:00">21:00</option>
                </>
            )
            setWarning(<p className="time-warning">21:00 fullbokad</p>)
        } else {
            setTimeOptions(
                <>
                    <option disabled={false} value="18:00">18:00</option>
                    <option disabled={false}  value="21:00">21:00</option>
                </>
            )
                setWarning(<p  className="time-warning"></p> )
        }
        console.log(timeRef.current?.value)

    }
    // Function that saves changes that admin made in guests booking
    function sendChange () {
        console.log(timeRef.current?.value)
        axios.put(`http://localhost:4000/bookings/update/${ref}`, 
        {
            firstname: firstNameRef.current?.value,
            lastname: lastNameRef.current?.value,
            phonenumber: phoneRef.current?.value,
            email: emailRef.current?.value,
            message : messageRef.current?.value,
            time: timeRef.current?.value || booking?.time,
            date: dateRef.current?.value,
            guests: guestRef.current?.value

        }).then((response) => {console.log(response)})
        history.push('/admin')
    }


    useEffect(() => {
        axios
          .get("http://localhost:4000/bookings")
          .then((res) => {
            console.log(res.data);
            setBookingList(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      //Admin edit allow and structure
    return (
        <div>
            <Header title="Ändra Bokning"/>
            <div className="white-container-wrapper">
                <div className="white-container">
                    <label htmlFor="guests">Antal Gäster: </label>
                    <input type="number" name="guests" id="" defaultValue={booking?.guests} ref={guestRef} />
                    <label htmlFor="date">Datum:</label>
                    <p className="alert-container">Välj Datum för att kolla om en ny tid är tillgänglig</p>
                    <input type="date" name="date" defaultValue={booking?.date} ref={dateRef} id="" onChange={() => { findAvailable()}}/>
                    <label htmlFor="tid">Tider: </label>
                    <select name="tid" id="" ref={timeRef}>
                        {timeOptions}
                    </select>
                    {warning}
                    <label htmlFor="firstname">Förnamn:</label>
                    <input type="text" name="firstname" defaultValue={booking?.firstname} ref={firstNameRef} />
                    <label htmlFor="lastname">Efternamn:</label>
                    <input type="text" name="lastname" defaultValue={booking?.lastname} ref={lastNameRef} />
                    <label htmlFor="phonenumber">Telefon:</label>
                    <input type="text" name="phonenumber"  defaultValue={booking?.phonenumber} ref={phoneRef}/>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email"  defaultValue={booking?.email} ref={emailRef}/>
                    <label htmlFor="message"></label>
                    <textarea name="message" rows={4} defaultValue={booking?.message} ref={messageRef}></textarea>
                    <button className="lazy-bee-confirm-btn" onClick={sendChange}>
                        <img src={knapp} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminEdit
