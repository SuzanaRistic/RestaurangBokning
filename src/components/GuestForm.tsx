import {useFormik} from 'formik' ;
import * as yup from 'yup';
import BookingForm from './BookingForm';
import './../styles/Booking.scss'
import { createRef, useEffect, useState } from 'react';
import button from './../images/bekfräftaknapp.svg'
import ISendBookingProps from './BookingForm'
import IBooking from '../interfaces/IBooking';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


interface IGuestComponentProps {
    time: string;
    date: string;
    guests: number;
}

const GuestComponent=(props: IGuestComponentProps)=> {
    const [booking, setBooking] = useState<IBooking>()
    let history = useHistory();

    const booking_ref = uuidv4();

    const firstNameRef = createRef<HTMLInputElement>();
    const lastNameRef = createRef<HTMLInputElement>();
    const phoneRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const messageRef = createRef<HTMLTextAreaElement>();
    const phoneValid = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phonenumber:'',
            message: '',
        },
        validationSchema: yup.object({
            firstname:yup.string().max(15,'Firstname should not exceed 15 characters.').
            required('Please enter your firstname.'),
            lastname:yup.string().max(15,'Lastname should not exceed 15 characters.').
            required('Please enter your lastname.'),
            email:yup.string().email('Invalid email address.').
            required('Please enter your email.'),
            phonenumber:yup.string().matches(phoneValid, 'Invalid phone number.').
            required('Please enter your phone number'),
            message:yup.string().max(150,'Message should not exceed 150 characters.')
        }),
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });

    function SendBooking ( ) {
        setBooking({
            guests: props.guests,
            firstname: firstNameRef.current?.value || ' ',
            lastname: lastNameRef.current?.value || ' ',
            email: emailRef.current?.value || ' ',
            phonenumber: phoneRef.current?.value || ' ',
            time: props.time,
            booking_reference: booking_ref,
            date:  props.date,
            message: messageRef.current?.value || ' '
        })
        
    }
    useEffect(() => {
        if (booking) {
            axios.post('http://localhost:4000/bookings', booking )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            history.push(`/bokningsbekraftelse/${booking.booking_reference}`)
        } 
        
    }, [booking]);
return (
    <form onSubmit= {formik.handleSubmit}>
    <label htmlFor="firstname">Förnamn</label>
    <input type="text" {...formik.getFieldProps("firstname")} ref={firstNameRef}/>
        {formik.touched.firstname && formik.errors.firstname ? <span style={{color:'red'}}>{formik.errors.firstname}</span> : null}

     <label htmlFor="lastname">Efternamn</label>
     <input type="text" {...formik.getFieldProps("lastname")} ref={lastNameRef} />
        {formik.touched.lastname && formik.errors.lastname ? <span style={{color: 'red'}}>{formik.errors.lastname}</span> : null }

     <label htmlFor="email">Email</label>
     <input type="email" {...formik.getFieldProps("email")} ref={emailRef} />
     {formik.touched.email && formik.errors.email ? <span style={{color: 'red'}}>{formik.errors.email}</span> : null }

     <label htmlFor="phonenumber">Telefon</label>
     <input type="tel" {...formik.getFieldProps("phonenumber")} ref={phoneRef} />
     {formik.touched.phonenumber && formik.errors.phonenumber ? <span style={{color: 'red'}}>{formik.errors.phonenumber}</span> : null }


     <label htmlFor="message">Allergener/Önskemål</label>
     <textarea rows={4} {...formik.getFieldProps("message")} ref={messageRef} />
     {formik.touched.message && formik.errors.message ? <span style={{color: 'red'}}>{formik.errors.message}</span> : null }



    <button className="confirm-btn" onClick={SendBooking}>
        <img src={button} alt=""  />
    </button> 
    </form>
)
}
export default GuestComponent