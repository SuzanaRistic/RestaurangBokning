import React, {createRef, useEffect, useState} from 'react';
import './../styles/Booking.scss';
import gavidare from './../images/gå vidare med bokning knapp.svg';
import IBooking from '../interfaces/IBooking';
import axios from 'axios';
import GuestComponent from './GuestForm';
import {findTables} from './findTime';

function BookingForm() {
  // making a string for todays date to use as minimun value in our date-input
  const now = new Date(Date.now());
  const todayIso = now.toISOString();
  const today = todayIso.slice(0, 10);
  // all our states 
  const [buttonVariable, setButtonVariable] = useState(<div></div>);
  const [time, setTime] = useState('18:00');
  const [showFirst, setShowFirst] = useState(true);
  const [bookingList, setBookingList] = useState<IBooking[]>();
  const [dateGuestTimeInfo, setDateGuestTimeInfo] = useState({guests: 0,  time: '', date: ''});

  // refs for the inputs
  const guestsRef = createRef<HTMLSelectElement>();
  const dateRef = createRef<HTMLInputElement>();

  // a function to set the state of our first 3 choices in the booking form and then, show the user the other form for the contactinfo
  function sendFirstPart() {
    // sets the choices
    setDateGuestTimeInfo({
      guests: Number(guestsRef.current?.value) || 0,
      date: dateRef.current?.value?.toString() || '',
      time: time,
    });
    // toggles the component GuestForm 
    setShowFirst(false);
  }

  // gets all of our bookings from our database and put them in a state
  useEffect(() => {
    axios
      .get<IBooking[]>('http://localhost:4000/bookings')
      .then((res) => {
        setBookingList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // sends a request for a date, and shows the appropriate html for that specifik scenario
  function sendRequest() {
    let guests = Number(guestsRef.current?.value);
    let date = dateRef.current?.value?.toString();

    // gets the info from the findTables function that is in findTime.ts, this function calculates how many tables there is for each timeslot for the requested date
    const tables = findTables(bookingList || [], date || '');

    // if statement that checks the availability for the night and show the matching html
    if (
      // if the night is all fully booked
      Math.ceil(tables.totalNumberOfGuestsForRequestedDate || 0 / 6) +
        Math.ceil(guests / 6) >=
      30
    ) {
      setTime(' ');
      setButtonVariable(
        <>
          <div className="time-btns"></div>
          <p>Tyvärr så är vi fullbokade denna kväll!</p>
        </>
      );
    } else if (
      // if 18:00 is all fully booked
      tables.tablesForSlotOne + Math.ceil(guests / 6) >=
      15
    ) {
      setTime('21:00');
      setButtonVariable(
        <>
          <div className="time-btns">
            <button className="time-btn">21:00</button>
          </div>
          <p>Det finns endast lediga bord kl. 21:00 denna kväll</p>
        </>
      );
    } else if (
      // if 21:00 is all fully booked
      tables.tablesForSlotTwo + Math.ceil(guests / 6) >=
      15
    ) {
      setTime('18:00');
      setButtonVariable(
        <>
          <div className="time-btns">
            <button className="time-btn"> 18:00</button>
          </div>
          <p>Det finns endast lediga bord kl. 18:00 denna kväll</p>
        </>
      );
    } else {
      // if both timeslots are available
      setButtonVariable(
        <>
          <div className="time-btns">
            <button
              className="time-btn"
              onClick={() => {
                setTime('18:00');
              }}
            >
              18:00
            </button>
            <button
              className="time-btn"
              onClick={() => {
                setTime('21:00');
              }}
            >
              21:00
            </button>
          </div>
          <p>Välj en ledig tid för ditt besök</p>
        </>
      );
    }
  }

  return (
    <>
      {showFirst && (
        <div className="white-container-booking">
          <label htmlFor="guests">Antal Gäster</label>
          <select name="guests" id="guests" ref={guestsRef} required>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
          </select>
          <div className="date-time-wrap">
            <div>
              <label htmlFor="date">Datum</label>
              <input
                ref={dateRef}
                min={today}
                type="date"
                name="date"
                id="date"
                required
                onChange={sendRequest}
              />
              <p>Välj önskat besöksdatum</p>
            </div>
            <div>
              <label htmlFor="tid">Tid</label>
              {buttonVariable}
              {time.length > 1 && <p>Du har valt tiden: {time} </p>}
            </div>
          </div>
          {dateGuestTimeInfo.date.length <= 1 ||
          dateGuestTimeInfo.guests < 0 ||
          dateGuestTimeInfo.time.length <= 1 ? (
            <button className="confirm-btn" disabled={true}>
              <img src={gavidare} alt="" />
            </button>
          ) : (
            <button
              className="confirm-btn"
              onClick={(e) => {
                e.preventDefault();
                sendFirstPart();
              }}
              disabled={false}
            >
              <img src={gavidare} alt="" />
            </button>
          )}
        </div>
      )}

      {!showFirst && (
        <div className="white-container-booking">
          <div className="booking-info-container">
            <p>
              Antal: <br></br> {dateGuestTimeInfo.guests}
            </p>
            <p>
              Datum: <br></br> {dateGuestTimeInfo.date}
            </p>
            <p>
              Tid: <br></br> {dateGuestTimeInfo.time}
            </p>
          </div>
          <GuestComponent
            time={dateGuestTimeInfo.time}
            date={dateGuestTimeInfo.date}
            guests={dateGuestTimeInfo.guests}
          ></GuestComponent>
        </div>
      )}
    </>
  );
}

export default BookingForm;
