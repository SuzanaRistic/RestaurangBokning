import {useFormik} from 'formik';
import * as yup from 'yup';
import './../styles/Booking.scss';
import {createRef, useEffect, useState} from 'react';
import button from './../images/bekfräftaknapp.svg';
import IBooking from '../interfaces/IBooking';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import 'yup-phone';
import {init, send} from 'emailjs-com';
init('user_OHyxXpSu4H1rj4LKQ2q7L');

// the props for this component, they take the values from the input of its parent
interface IGuestComponentProps {
  time: string;
  date: string;
  guests: number;
}
// Validation of information that guest writes when booking table
const GuestComponent = (props: IGuestComponentProps) => {
  const [booking, setBooking] = useState<IBooking>();
  let history = useHistory();

  // uuid creates a unique id for our booking reference 
  const booking_ref = uuidv4();

  // refs for inputs
  const firstNameRef = createRef<HTMLInputElement>();
  const lastNameRef = createRef<HTMLInputElement>();
  const phoneRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const messageRef = createRef<HTMLTextAreaElement>();

  // validation for the inputs
  const phoneValid =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      message: '',
    },

    //checking if inputs are valid
    validationSchema: yup.object({
      firstname: yup
        .string()
        .max(15, 'Firstname should not exceed 15 characters.')
        .matches(/^[aA-öÖ\s]+$/, 'Only alphabets are allowed in this field.')
        .required('Please enter your firstname.'),
      lastname: yup
        .string()
        .max(15, 'Lastname should not exceed 15 characters.')
        .matches(/^[aA-öÖ\s]+$/, 'Only alphabets are allowed in this field.')
        .required('Please enter your lastname.'),
      email: yup
        .string()
        .email('Invalid email address.')
        .required('Please enter your email.'),
      phonenumber: yup
        .string()
        .matches(phoneValid, 'Invalid phone number.')
        .required('Please enter your phone number'),
      message: yup
        .string()
        .max(150, 'Message should not exceed 150 characters.'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

   //set the booking state and send the confirmation email to the guest
   function SendBooking() {
    //set state for booking
    setBooking({
      guests: props.guests,
      firstname: firstNameRef.current?.value || ' ',
      lastname: lastNameRef.current?.value || ' ',
      email: emailRef.current?.value || ' ',
      phonenumber: phoneRef.current?.value || ' ',
      time: props.time,
      booking_reference: booking_ref,
      date: props.date,
      message: messageRef.current?.value || ' ',
    });

    // send email using emailjs
    var templateParams = {
      firstname: firstNameRef.current?.value,
      date: props.date,
      time: props.time,
      to_email: emailRef.current?.value,
      bookingref: booking_ref,
      cancelBooking: `http://localhost:3000/avboka/${booking_ref}`,
      guests: props.guests,
    };
    send('service_1t779ze', 'template_ui3c5na', templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (error) {
        console.log('FAILED...', error);
      }
    );
  }

  // send booking to database when the state is updated
  useEffect(() => {
    if (booking) {
      axios
        .post('http://localhost:4000/bookings', booking)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      history.push(`/bokningsbekraftelse/${booking.booking_reference}`);
    }
  }, [booking]);

  return (
    <form onSubmit={formik.handleSubmit} className="guest-form">
      <label htmlFor="firstname">Förnamn*</label>
      <input
        type="text"
        {...formik.getFieldProps('firstname')}
        ref={firstNameRef}
        required
      />
      <div className="invalid-input">
        {formik.touched.firstname && formik.errors.firstname ? (
          <span style={{color: 'red'}}>{formik.errors.firstname}</span>
        ) : null}
      </div>

      <label htmlFor="lastname">Efternamn*</label>
      <input
        type="text"
        {...formik.getFieldProps('lastname')}
        ref={lastNameRef}
        required
      />
      <div className="invalid-input">
        {formik.touched.lastname && formik.errors.lastname ? (
          <span style={{color: 'red'}}>{formik.errors.lastname}</span>
        ) : null}
      </div>

      <label htmlFor="email">Email*</label>
      <input
        type="email"
        {...formik.getFieldProps('email')}
        ref={emailRef}
        required
      />
      <div className="invalid-input">
        {formik.touched.email && formik.errors.email ? (
          <span style={{color: 'red'}}>{formik.errors.email}</span>
        ) : null}
      </div>

      <label htmlFor="phonenumber">Telefon*</label>
      <input
        type="tel"
        {...formik.getFieldProps('phonenumber')}
        ref={phoneRef}
        required
      />
      <div className="invalid-input">
        {formik.touched.phonenumber && formik.errors.phonenumber ? (
          <span style={{color: 'red'}}>{formik.errors.phonenumber}</span>
        ) : null}
      </div>

      <label htmlFor="message">Allergener/Önskemål</label>
      <textarea
        rows={4}
        {...formik.getFieldProps('message')}
        ref={messageRef}
      />
      <div className="invalid-input">
        {formik.touched.message && formik.errors.message ? (
          <span style={{color: 'red'}}>{formik.errors.message}</span>
        ) : null}
      </div>

      <p className="obligatory-message">
        *Vänligen fyll i alla obligatoriska fält
      </p>

      <button
        className="lazy-bee-confirm-btn"
        onClick={SendBooking}
        disabled={!(formik.isValid && formik.dirty)}
      >
        <img src={button} alt="" />
      </button>
    </form>
  );
};
export default GuestComponent;

