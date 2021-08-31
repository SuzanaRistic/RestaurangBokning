import {useFormik} from "formik";
import * as yup from "yup";
import "./../styles/Booking.scss";
import {createRef, useEffect, useState} from "react";
import button from "./../images/bekfräftaknapp.svg";
import IBooking from "../interfaces/IBooking";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {useHistory} from "react-router-dom";
import "yup-phone";
import emailjs from "emailjs-com";
import {init, send} from "emailjs-com";
init("user_Ch1FNPoMiF71pjLImRE4l");

interface IGuestComponentProps {
  time: string;
  date: string;
  guests: number;
}

const GuestComponent = (props: IGuestComponentProps) => {
  const [booking, setBooking] = useState<IBooking>();
  let history = useHistory();

  const booking_ref = uuidv4();

  const firstNameRef = createRef<HTMLInputElement>();
  const lastNameRef = createRef<HTMLInputElement>();
  const phoneRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const messageRef = createRef<HTMLTextAreaElement>();
  const phoneValid =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      message: "",
    },
    validationSchema: yup.object({
      firstname: yup
        .string()
        .max(15, "Firstname should not exceed 15 characters.")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed in this field.")
        .required("Please enter your firstname."),
      lastname: yup
        .string()
        .max(15, "Lastname should not exceed 15 characters.")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed in this field.")
        .required("Please enter your lastname."),
      email: yup
        .string()
        .email("Invalid email address.")
        .required("Please enter your email."),
      phonenumber: yup
        .string()
        .matches(phoneValid, "Invalid phone number.")
        .required("Please enter your phone number"),
      message: yup
        .string()
        .max(150, "Message should not exceed 150 characters."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  function SendBooking() {
    setBooking({
      guests: props.guests,
      firstname: firstNameRef.current?.value || " ",
      lastname: lastNameRef.current?.value || " ",
      email: emailRef.current?.value || " ",
      phonenumber: phoneRef.current?.value || " ",
      time: props.time,
      booking_reference: booking_ref,
      date: props.date,
      message: messageRef.current?.value || " ",
    });
    var templateParams = {
      firstname: firstNameRef.current?.value,
      date: props.date,
      time: props.time,
      email: emailRef.current?.value,
      bookingref: booking_ref,
      cancelBooking: `http://localhost:4000/bookings/avboka/${booking_ref}`,
    };
    send("service_cv5c5tu", "template_i3xa6ke", templateParams)
      .then((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    if (booking) {
      axios
        .post("http://localhost:4000/bookings", booking)
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
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstname">Förnamn*</label>
      <input
        type="text"
        {...formik.getFieldProps("firstname")}
        ref={firstNameRef}
        required
      />
      <div className="invalid-input">
        {formik.touched.firstname && formik.errors.firstname ? (
          <span style={{color: "red"}}>{formik.errors.firstname}</span>
        ) : null}
      </div>

      <label htmlFor="lastname">Efternamn*</label>
      <input
        type="text"
        {...formik.getFieldProps("lastname")}
        ref={lastNameRef}
        required
      />
      <div className="invalid-input">
        {formik.touched.lastname && formik.errors.lastname ? (
          <span style={{color: "red"}}>{formik.errors.lastname}</span>
        ) : null}
      </div>

      <label htmlFor="email">Email*</label>
      <input
        type="email"
        {...formik.getFieldProps("email")}
        ref={emailRef}
        required
      />
      <div className="invalid-input">
        {formik.touched.email && formik.errors.email ? (
          <span style={{color: "red"}}>{formik.errors.email}</span>
        ) : null}
      </div>

      <label htmlFor="phonenumber">Telefon*</label>
      <input
        type="tel"
        {...formik.getFieldProps("phonenumber")}
        ref={phoneRef}
        required
      />
      <div className="invalid-input">
        {formik.touched.phonenumber && formik.errors.phonenumber ? (
          <span style={{color: "red"}}>{formik.errors.phonenumber}</span>
        ) : null}
      </div>

      <label htmlFor="message">Allergener/Önskemål</label>
      <textarea
        rows={4}
        {...formik.getFieldProps("message")}
        ref={messageRef}
      />
      <div className="invalid-input">
        {formik.touched.message && formik.errors.message ? (
          <span style={{color: "red"}}>{formik.errors.message}</span>
        ) : null}
      </div>

      <p className="obligatory-message">
        *Vänligen fyll i alla obligatoriska fält
      </p>

      <button
        className="confirm-btn"
        onClick={SendBooking}
        disabled={!(formik.isValid && formik.dirty)}
      >
        <img src={button} alt="" />
      </button>
    </form>
  );
};
export default GuestComponent;
