import axios from 'axios';
import React, { createRef, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import IBooking from '../../interfaces/IBooking';
import Header from '../Header'
import './../../styles/EditAdmin.scss'
import {IParams} from './Confirmation'
import knapp from "./../../images/ändrabokningknapp.svg";

function AdminEdit() {
    const history = useHistory();
    const { ref } = useParams<IParams>();
    const [booking, setBooking] = useState<IBooking>()
    const [bookingList, setBookingList] = useState<IBooking[]>();
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


    
    function sendChange () {
        axios.put(`http://localhost:4000/bookings/update/${ref}`, 
        {
            firstname: firstNameRef.current?.value,
            lastname: lastNameRef.current?.value,
            phonenumber: phoneRef.current?.value,
            email: emailRef.current?.value,
            message : messageRef.current?.value

        }).then((response) => {console.log(response)})
        history.push('/')
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
    return (
        <div>
            <Header title="Ändra Bokning"/>
            <div className="white-container-wrapper">
                <div className="white-container">
                    <label htmlFor="date">Datum:</label>
                    <input type="date" name="date" defaultValue={booking?.date} ref={dateRef} id="" onChange={() => { }}/>
                    <h3>{booking?.time}</h3>

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
                    <button className="confirm-btn" onClick={sendChange}>
                        <img src={knapp} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminEdit
