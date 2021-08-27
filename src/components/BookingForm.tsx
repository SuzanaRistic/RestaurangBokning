import React, {createRef, useEffect, useState} from "react";
import "./../styles/Booking.scss";
import gavidare from "./../images/gå vidare med bokning knapp.svg";
import IBooking from "../interfaces/IBooking";
import axios from "axios";
import GuestComponent from "./GuestForm";

function BookingForm() {
  const [time, setTime] = useState("18:00");
  const [toggleTimeBtns, setToggleTimeBtns] = useState(true);
  const [showFirst, setShowFirst] = useState(true);
  const [bookingList, setBookingList] = useState<IBooking[]>();
  const [dateGuestTimeInfo, setDateGuestTimeInfo] = useState({
    guests: 0,
    time: "",
    date: "",
  });

  const [requestedBooking, setRequestedBooking] = useState({
    guests: 1,
    date: "",
  });
  const [guests, setGuests] = useState({
    guestsForRequestedDate: 0,
    guestsTOne: 0,
    guestsTTwo: 0,
  });

  const [buttonVariable, setButtonVariable] = useState(<div></div>);

  const guestsRef = createRef<HTMLSelectElement>();
  const dateRef = createRef<HTMLInputElement>();

  function sendFirstPart() {
    setDateGuestTimeInfo({
      guests: Number(guestsRef.current?.value) || 0,
      date: dateRef.current?.value?.toString() || "",
      time: time,
    });
    setShowFirst(false);
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
  //store requested date and number of guests in variables
  function sendRequest() {
    setRequestedBooking({
      guests: Number(guestsRef.current?.value),
      date: dateRef.current?.value?.toString() || "",
    });
  }
  var buttonHtml;

  useEffect(() => {
    console.log(
      "Number of guests: ",
      requestedBooking?.guests,
      "Date requested: ",
      requestedBooking?.date
    );

    //get the number of guests and time for requested booking from the database
    const totalNumberOfGuestsAndTimeList = bookingList
      ?.filter((totalGuests) => totalGuests.date === requestedBooking?.date)
      .map((filteredGuests) => ({
        time: filteredGuests.time,
        guests: filteredGuests.guests,
      }));
    const totalNumberOfGuestsList = totalNumberOfGuestsAndTimeList?.map(
      (filterGuests) => filterGuests.guests
    );
    const totalNumberOfGuestsForRequestedDate = totalNumberOfGuestsList?.reduce(
      (a, b) => a + b,
      0
    );
    const guestsForTimeSlotOne = totalNumberOfGuestsAndTimeList
      ?.filter(
        (totalNumberOfGuestsAndTimeListFiltered) =>
          totalNumberOfGuestsAndTimeListFiltered.time === "18:00"
      )
      .map((filterSlotOne) => filterSlotOne.guests)
      .reduce((a, b) => a + b, 0);
    const guestsForTimeSlotTwo = totalNumberOfGuestsAndTimeList
      ?.filter(
        (totalNumberOfGuestsAndTimeListFiltered) =>
          totalNumberOfGuestsAndTimeListFiltered.time === "21:00"
      )
      .map((filterSlotTwo) => filterSlotTwo.guests)
      .reduce((a, b) => a + b, 0);

    setGuests({
      guestsForRequestedDate: totalNumberOfGuestsForRequestedDate || 0,
      guestsTOne: guestsForTimeSlotOne || 0,
      guestsTTwo: guestsForTimeSlotTwo || 0,
    });

    // var buttonHtml;
    if (guests.guestsForRequestedDate + requestedBooking.guests > 180) {
      setButtonVariable(
        <>
          <div className="time-btns">
            <button className="time-btn-disabled" disabled>
              18:00
            </button>
            <button className="time-btn-disabled" disabled>
              21:00
            </button>
          </div>
          <p>Sorry, we are fully booked today</p>
        </>
      );
    } else if (guests.guestsTOne + requestedBooking.guests > 90) {
      setTime("21:00");
      setButtonVariable(
        <>
          <div className="time-btns">
            <button className="time-btn-disabled" disabled>
              18:00
            </button>
            <button className="time-btn-clicked">21:00</button>
          </div>
          <p>Only 21:00 is available on this night</p>
        </>
      );
    } else if (guests.guestsTTwo + requestedBooking.guests > 90) {
      setTime("18:00");

      setButtonVariable(
        <>
          <div className="time-btns">
            <button className="time-btn-clicked"> 18:00</button>
            <button className="time-btn-disabled" disabled>
              21:00
            </button>
          </div>
          <p>Only 18:00 is available on this night</p>
        </>
      );
    } else {
      if (toggleTimeBtns) {
        setButtonVariable(
          <>
            <div className="time-btns">
              <button className="time-btn-clicked">18:00</button>
              <button
                className="time-btn"
                onClick={() => {
                  setToggleTimeBtns(false);
                  setTime("21:00");
                }}
              >
                21:00
              </button>
            </div>
            <p>Pick an available time slot</p>
          </>
        );
      } else {
        setButtonVariable(
          <>
            <div className="time-btns">
              <button
                className="time-btn"
                onClick={() => {
                  setToggleTimeBtns(true);
                  setTime("18:00");
                }}
              >
                18:00
              </button>
              <button className="time-btn-clicked">21:00</button>
            </div>
            <p>Pick an available time slot</p>
          </>
        );
      }
    }

  }, [requestedBooking]);

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
                type="date"
                name="date"
                id="date"
                required
                onChange={sendRequest}
              />
              <p>Pick a date</p>
            </div>
            <div>
              <label htmlFor="tid">Tid</label>
              {buttonVariable}
            </div>
          </div>
          {dateGuestTimeInfo.date.length < 1 || dateGuestTimeInfo.guests < 1 || dateGuestTimeInfo.time.length < 1 ?
          <button
            className="confirm-btn"
          >
            <img src={gavidare} alt="" />
          </button> :
           <button
            className="confirm-btn"
            onClick={(e) => {
              e.preventDefault();
              sendFirstPart();
            } } disabled={false}

          >
            <img src={gavidare} alt="" />
          </button>}
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
